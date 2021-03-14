import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    getFilterOptions, selectFilter
} from './Select.ducks';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {CircularProgress, TextField} from "@material-ui/core";
import {EStatus} from "./Select.types";

let timeoutSearch: ReturnType<typeof setTimeout>;

const Select: React.FC = () => {

    const dispatch = useDispatch();
    const selectFilterOption = useSelector(selectFilter);
    const [load, setLoad] = useState(false);

    const onChangeHandler = (value: string) => {
        setLoad(true);
        if (timeoutSearch) clearTimeout(timeoutSearch)
        timeoutSearch = setTimeout(() => {
            setLoad(false);
            dispatch(getFilterOptions(value))
        }, 400)
    }

    return <>
        <Autocomplete
            style={{width: 300}}
            getOptionLabel={(option) => option.title}
            options={load || selectFilterOption.status === EStatus.LOADING ? [] : selectFilterOption.data}
            loading={load || selectFilterOption.status === EStatus.LOADING}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Я поле для ввода"
                    variant="outlined"
                    onChange={e => onChangeHandler(e.target.value)}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {selectFilterOption.status === EStatus.LOADING ?
                                    <CircularProgress color="inherit" size={20}/> : null}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    </>
}

export default Select;

