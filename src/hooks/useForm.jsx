import { useState } from "react";
function useForm(list) {
    const [formItem, setFormItem] = useState({ assignee: "", text: "", difficulty: "", date: '' });
    const handleInputChange = (e) => {
        const prevItem = formItem;
        console.log(e);
        setFormItem({ ...prevItem, [e.target.name]: e.target.value });
    };
    const handleEdit = async (id) => {
        console.log('here');
        const item = list.filter((elem) => {
            return elem._id === id;
        });
        item[0].editFlag = true;
        item[0].date = item[0].date.slice(0, 10);
        setFormItem(item[0]);
    };
    return [formItem, handleInputChange, handleEdit , setFormItem];
}

export default useForm;