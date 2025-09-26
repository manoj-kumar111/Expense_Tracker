import { useSelector, useDispatch } from "react-redux";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "./ui/button";
import { Trash } from "lucide-react";
import UpdateExpense from "./UpdateExpense";
import { useEffect, useState } from "react";
import axios from "axios";
import { fetchExpenses } from "../hooks/useGetExpenses";
import { toast } from "sonner";


const ExpenseTable = () => {
    const { expenses, category, markAsDone } = useSelector(store => store.expense);
    const [checkedItems, setCheckedItems] = useState({});
    const dispatch = useDispatch();

    const totalAmount = expenses.reduce((acc, expense) => {
        if (!expense || !expense._id) {
            return acc;
        }
        if (!checkedItems[expense._id]) {
            return acc + expense.amount;
        }
        return acc;
    }, 0)

    const handleCheckboxChange = async (expenseId) => {
        const newStatus = !checkedItems[expenseId];
        try {
            const res = await axios.put(`http://localhost:3000/api/v1/expense/${expenseId}/done`, { done: newStatus }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if(res.data.success){
                toast.success(res.data.message);
                setCheckedItems(prevData=>({
                    ...prevData,
                    [expenseId]:newStatus
                }));
                // Refetch expenses from backend to update UI using current Redux values
                await fetchExpenses(dispatch, category, markAsDone);
            };
        }
        catch (error) {
            console.log(error);
        }
    }

    const removeExpenseHandler = async (expenseId) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/v1/expense/remove/${expenseId}`);
            if (res.data.success) {
                toast.success(res.data.message);
                // Refetch expenses from backend to update UI using current Redux values
                await fetchExpenses(dispatch, category, markAsDone);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    return (
        <Table>
            <TableCaption>A list of your recent Expenses.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Mark As Done</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {expenses.length === 0 ? (
                    <span>Add Your First Expense</span>
                ) : (
                    expenses
                        ?.filter(expense => expense && expense._id)
                        .map((expense) => (
                            <TableRow key={expense._id}>
                                <TableCell className="font-medium">
                                    <Checkbox
                                        checked={expense.done}
                                        onCheckedChange={() => handleCheckboxChange(expense._id)}
                                    />
                                </TableCell>
                                <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.description}</TableCell>
                                <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.amount}</TableCell>
                                <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.category}</TableCell>
                                <TableCell className={`${expense.done ? 'line-through' : ''}`}>{expense.createdAt?.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end">
                                        <Button
                                            onClick={() => removeExpenseHandler(expense._id)}
                                            size="icon"
                                            className="rounded-full border 
                                            text-red-600 
                                            border-red-600 
                                            hover:border-transparent"
                                            variant="outline">
                                            <Trash
                                                className='h-4 w-4'
                                            />
                                        </Button>
                                        {/* <Button
                                            size="icon"
                                            className="rounded-full border 
                                            text-red-600 
                                            border-red-600 
                                            hover:border-transparent"
                                            variant="outline">
                                            <Edit2
                                                className='h-4 w-4'
                                            />
                                        </Button> */}
                                        <UpdateExpense expense={expense}/>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))
                )}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={5} className='font-bold text-xl'>Total</TableCell>
                    <TableCell className="text-right fonr-bold text-xl">Rs. {totalAmount}</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}

export default ExpenseTable;