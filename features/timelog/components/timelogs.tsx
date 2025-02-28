import {TimelogEntry} from "@/types";
import {Input} from "@/components/ui/input";
import {FormField, FormItem, FormLabel, Form} from "@/components/ui/form";
import {DateField, DateInput} from "@/components/datetime-field";
import {useFieldArray, useForm} from "react-hook-form";
import {Button} from "@/components/ui/button";
import {useBatchCreateTimelog} from "../hooks";
import {TimelogUpdateInput} from "../types";
import {useState} from "react";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {parseDateTime} from "@internationalized/date";
import {DateTime} from "luxon";


type TimelogsProps = {
    timelogs: TimelogEntry[];
};

// Define Zod schema for form validation
const timelogEntrySchema = z.object({
    title: z.string().min(1, "Title is required"),
    date: z.string(),
    start_time: z.string().min(1, "Start time is required"),
    end_time: z.string(),
    source: z.string()
});

const timelogsFormSchema = z.object({
    entries: z.array(timelogEntrySchema)
});

type FormValues = z.infer<typeof timelogsFormSchema>;

export default function Timelogs({ timelogs }: TimelogsProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { mutateAsync: batchUpdate } = useBatchCreateTimelog();
    
    const form = useForm<FormValues>({
        resolver: zodResolver(timelogsFormSchema),
        defaultValues: {
            entries: timelogs.map(log => ({
                title: log.title,
                date: log.date,
                start_time: log.start_time,
                end_time: log.end_time,
                source: log.source
            }))
        }
    });

    const {
        fields: entries,
        update: updateEntries,
        append: appendEntry,
        remove: removeEntry
    } = useFieldArray({
        control: form.control,
        name: 'entries',
        keyName: '_id'
    })

    const onSubmit = async (data: FormValues) => {
        try {
            setIsSubmitting(true);
            
            // Transform form data to match API requirements
            const updateData = data.entries.map(entry => {
                const [task, description] = entry.title.split(' - ');
                return {
                    task: task || entry.title,
                    description: description || '',
                    start_time: entry.start_time,
                    end_time: entry.end_time,
                    source: entry.source
                } as TimelogUpdateInput;
            });
            
            await batchUpdate(updateData);
            alert('Timelogs updated successfully!');
        } catch (error) {
            console.error('Failed to update timelogs:', error);
            alert('Failed to update timelogs. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Updating...' : 'Update Timelogs'}
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
                                        name={`entries.${index}.start_time`}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel htmlFor={'startDate'}>Start date</FormLabel>
                                                <DateField
                                                    className="*:not-first:mt-2"
                                                    hourCycle={24}
                                                    defaultValue={parseDateTime(field.value)}
                                                    value={parseDateTime(field.value)}
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
                                        name={`entries.${index}.end_time`}
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel htmlFor={'endDate'}>End date</FormLabel>
                                                <DateField
                                                    className="*:not-first:mt-2"
                                                    hourCycle={24}
                                                    defaultValue={parseDateTime(field.value)}
                                                    value={parseDateTime(field.value)}
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