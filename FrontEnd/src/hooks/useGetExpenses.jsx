import { setExpenses } from '@/redux/expenseSlice';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const fetchExpenses = async (dispatch, category, markAsDone) => {
    try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:3000/api/v1/expense/getall?category=${category}&done=${markAsDone}`);
        if (res.data.success) {
            dispatch(setExpenses(res.data.expense));
        }
    } catch (error) {
        console.log(error);
    }
};

const useGetExpenses = () => {
    const dispatch = useDispatch();
    const { category, markAsDone } = useSelector(store => store.expense);

    useEffect(() => {
        fetchExpenses(dispatch, category, markAsDone);
    }, [dispatch, category, markAsDone]);
};

export default useGetExpenses;