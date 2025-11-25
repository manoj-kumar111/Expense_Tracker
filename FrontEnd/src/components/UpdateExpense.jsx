import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogDescription, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";
import axios from "axios";
import { toast } from "sonner";
import { Edit2, Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setExpenses, setSingleExpense } from "@/redux/expenseSlice";
import useGetExpenses, { fetchExpenses } from "../hooks/useGetExpenses";

const UpdateExpense = ({expense}) => {
    const {expenses, singleExpense} = useSelector(store=>store.expense);
    useGetExpenses();
    const [formData, setFormData] = useState({
        description: singleExpense?.description,
        amount: singleExpense?.amount,
        category: singleExpense?.category
    });

    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    useEffect(()=>{
        setFormData({
            description: singleExpense?.description,
            amount: singleExpense?.amount,
            category: singleExpense?.category
        })
    }, [singleExpense]);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const changeCategoryHandler = (value) => {
        setFormData((prevData) => ({ ...prevData, category: value }));
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            setLoading(true);
            const res = await api.put(`/api/v1/expense/update/${expense._id}`, formData);
            if (res.data.success) {
                // Refetch all expenses from backend to ensure UI is in sync
                const { category, markAsDone } = await import("@/redux/expenseSlice").then(mod => mod.default.getInitialState ? mod.default.getInitialState() : { category: '', markAsDone: '' });
                await fetchExpenses(dispatch, category, markAsDone);
                toast.success(res.data.message);
                setIsOpen(false);
            }
        }
        catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => {
                    dispatch(setSingleExpense(expense));
                    setIsOpen(false);
                }} size="icon" className='rounded-full border border-green-600 text-green-600 hover:border-transparent' variant="outline"><Edit2/></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Update Expense</DialogTitle>
                    <DialogDescription>
                        Update expense to here. Click Update when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={submitHandler}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Description
                            </Label>
                            <Input
                                id="description"
                                placeholder="description"
                                className="col-span-3"
                                name="description"
                                value={formData.description}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="username" className="text-right">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                placeholder="Rs"
                                className="col-span-3"
                                name="amount"
                                value={formData.amount}
                                onChange={changeEventHandler}
                            />
                        </div>
                        <Select value={formData.category} onValueChange={changeCategoryHandler}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="rent">Rent</SelectItem>
                                    <SelectItem value="food">Food</SelectItem>
                                    <SelectItem value="salary">Salary</SelectItem>
                                    <SelectItem value="shopping">Shopping</SelectItem>
                                    <SelectItem value="others">Others</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogFooter>
                        {
                            loading ? <Button className='w-full my-4'>
                                <Loader2 className='mr-2 h-4 aimate-spin' />
                                Please wait
                            </Button> :
                                <Button type="submit">
                                    Update
                                </Button>
                        }

                    </DialogFooter>
                </form>

            </DialogContent>
        </Dialog>
    )
}
export default UpdateExpense;