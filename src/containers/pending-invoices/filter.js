export function search(user){
    return Object.keys(this).every((key) => user[key].match(this[key]));
}

            // if(form.status !== '' && form.fact_num !== '' && form.descrip !== '') {
            //     data = data.filter((element: any) => element.status === form.status && element.fact_num === form.fact_num && element.descrip === form.descrip);
            // }

            // if(form.status === '' && form.fact_num !== '' && form.descrip !== '') {
            //     data = data.filter((element: any) => element.fact_num === form.fact_num && element.descrip === form.descrip);
            // }

            // if(form.status === '' && form.fact_num === '' && form.descrip !== '') {
            //     data = data.filter((element: any) => element.descrip === form.descrip);
            // }

            // if(form.status !== '' && form.fact_num !== '' && form.descrip === '') {
            //     data = data.filter((element: any) => element.status === form.status && element.fact_num === form.fact_num);
            // }

            // if(form.status !== '' && form.fact_num === '' && form.descrip === '') {
            //     data = data.filter((element: any) => element.status === form.status);
            // }

            // if(form.status === '' && form.fact_num !== '' && form.descrip === '') {
            //     data = data.filter((element: any) => element.fact_num === form.fact_num);
            // }