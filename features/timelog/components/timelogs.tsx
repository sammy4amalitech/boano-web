"use client"
import {Input} from "@/components/ui/input";
import {FormField, FormItem, FormLabel, Form} from "@/components/ui/form";
import {DateField, DateInput} from "@/components/datetime-field";
import {Button} from "@/components/ui/button";
import { useBatchUpsertTimeLog} from "../hooks";
import { TimeLogUpsertInput} from "../types";
import {zodResolver} from "@hookform/resolvers/zod";
import {parseDateTime} from "@internationalized/date";
import {FormValues, TimeLogResponse, timelogsFormSchema} from "@/lib/schemas";
import {useFieldArray, useForm} from "react-hook-form";
import {toast} from "sonner";


type TimelogsProps = {
    timelogs: TimeLogResponse[]
};



export default function Timelogs({ timelogs }: TimelogsProps) {
    const { mutateAsync: batchUpsert, isPending } = useBatchUpsertTimeLog();
    
    const form = useForm<FormValues>({
        resolver: zodResolver(timelogsFormSchema),
        defaultValues: {
            entries: timelogs.map(log => ({
                id: log.id,
                title: log.task,
                start_date: log.start_date,
                end_date: log.end_date,
                source: log.source
            }))
        }
    });

    const formValues = form.watch();

    const {
        fields: entries,
        // update: updateEntries,
        // append: appendEntry,
        // remove: removeEntry
    } = useFieldArray({
        control: form.control,
        name: 'entries',
        keyName: '_id'
    })

    const onSubmit = async (data: FormValues) => {
        try {

            // Transform form data to match API requirements
            const updateData : TimeLogUpsertInput[] = data.entries.map(entry => {
                return {
                    id: entry.id,
                    task: entry.title,
                    description: "",
                    start_time: entry.start_date,
                    end_time: entry.end_date,
                    source: entry.source
                }
            });
            
            await batchUpsert(updateData);
            toast.success('Time logs updated');
        } catch (error) {
            console.error('Failed to update timelogs:', error);
            toast.error('Failed to update timelogs');
        } finally {
            // await queryClient.invalidateQueries(['timelogs']);
        }
    };



    return (
        <Form {...form}>
            <form  className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <div className="flex justify-end">
                    <Button type="button" disabled={isPending} onClick={()=>{
                        console.log('form.handleSubmit(onSubmit)')
                        onSubmit(formValues)
                    }
                    }>
                        {isPending ? 'Updating...' : 'Update Timelogs'}
                    </Button>
                </div>
                <div className={'flex flex-col gap-8'}>
                    {entries.map((log, index) => {
                        return (
                            <div key={index} className=" flex flex-col gap-4">
                                <FormField
                                    control={form.control}
                                    name={`entries.${index}.title`}
                                    render={({field}) => (
                                        <FormItem>
                                            <Input {...field} />
                                        </FormItem>
                                    )}
                                />
                                <div className={'flex gap-4'}>
                                    <FormField
                                        control={form.control}
                                        name={`entries.${index}.start_date`}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel htmlFor={'start_date'}>Start date</FormLabel>
                                                <DateField
                                                    className="*:not-first:mt-2"
                                                    hourCycle={24}
                                                    defaultValue={field.value ? parseDateTime(field.value) : undefined}
                                                    value={field.value ? parseDateTime(field.value) : undefined}
                                                    onChange={(date) => {
                                                        field.onChange(date ? date.toString() : '');
                                                    }}
                                                >
                                                    <DateInput/>
                                                </DateField>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name={`entries.${index}.end_date`}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel htmlFor={'end_date'}>End date</FormLabel>
                                                <DateField
                                                    className="*:not-first:mt-2"
                                                    hourCycle={24}
                                                    defaultValue={field.value ? parseDateTime(field.value) : undefined}
                                                    value={field.value ? parseDateTime(field.value) : undefined}
                                                    onChange={(date) => {
                                                        field.onChange(date ? date.toString() : '');
                                                    }}
                                                >
                                                    <DateInput/>
                                                </DateField>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </form>
        </Form>
    );
}