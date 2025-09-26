import React from 'react'
import Navbar from './Navbar'
import CreateExpense from './CreateExpense'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useDispatch } from 'react-redux';
import { setCategory, setMarkAsDone } from '@/redux/expenseSlice';
import ExpenseTable from './ExpenseTable'
import useGetExpenses from '@/hooks/useGetExpenses';

const Home = () => {
    useGetExpenses();
    const dispatch = useDispatch();

    const changeCategoryHandler = (value) => {
        dispatch(setCategory(value));
    }

    const changeDoneHandler = (value) => {
        let backendValue = "";
        if (value === "done") backendValue = true;
        else if (value === "undone") backendValue = false;
        // "both" or any other value will be empty string (no filter)
        dispatch(setMarkAsDone(backendValue));
    }

    return (
        <div>
            <Navbar />
            <div className='max-w-6xl mx-auto mt-6'>
                <div className='flex items-center justify-between mb-5'>
                    <h1>Expense</h1>
                    <CreateExpense />
                </div>
                <div className='flex item-center gap-2 my-5'>
                    <h1 className='font-medium text-lg'>filter By:</h1>
                    <Select onValueChange={changeCategoryHandler}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="rent">Rent</SelectItem>
                                <SelectItem value="food">Food</SelectItem>
                                <SelectItem value="salary">Salary</SelectItem>
                                <SelectItem value="shopping">Shopping</SelectItem>
                                <SelectItem value="all">All</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <Select onValueChange={changeDoneHandler}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Mark as" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="done">Done</SelectItem>
                                <SelectItem value="undone">Undone</SelectItem>
                                <SelectItem value="both">Both</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <ExpenseTable />
            </div>
        </div>
    )
}

export default Home