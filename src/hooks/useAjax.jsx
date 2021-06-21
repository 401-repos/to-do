import { useState, useEffect } from 'react';
import axios from 'axios';
function useAjax() {
    const [list, setList] = useState([]);

    const baseURL = "https://api-server-0.herokuapp.com/";
    const addItem = async (item , setFormItem) => {
        setFormItem({ assignee: "", text: "", difficulty: "", date: '' });
        const newItem = { ...item };
        let myList = [...list];
        if (item.editFlag) {
            newItem.editFlag = false;
            item.editFlag = false;
            const edited = await axios.put(baseURL + "todo/" + item._id, JSON.stringify(item), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": baseURL } });
            let found = myList.findIndex((elem) => (elem._id === newItem._id));
            list.splice(found, 1)
            setList([...list, edited.data]);
        } else {
            newItem.complete = false;
            const added = await axios({
                method: 'post',
                baseURL: baseURL,
                url: '/todo',
                headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": baseURL },
                data: JSON.stringify(newItem)
            });
            setList([...list, added.data]);
        }
    };

    const handleDelete = async (_id) => {
        await axios({
            method: 'delete',
            baseURL: baseURL,
            url: '/todo/' + _id,
        });
        const newList = list.filter((elem) => _id !== elem._id);
        setList(newList);
    };
    const toggleComplete = async (id) => {
        const item = list.filter(elem => elem._id === id)[0];
        const toggled = await axios.put(baseURL + "todo/" + id, JSON.stringify({ ...item, complete: !item.complete }), { headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": baseURL } });
        let newList = list.map((listItem) =>
            listItem._id === item._id ? toggled.data : listItem
        );
        setList(newList);

    };
    useEffect(() => {
        async function fetch() {
          const res = await axios({
            method: 'get',
            baseURL: baseURL,
            url: '/todo',
          });
          setList(res.data);
        }
        fetch();
      }, []);
    return [toggleComplete, handleDelete, addItem , list , setList];
}

export default useAjax;