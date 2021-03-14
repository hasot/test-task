import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { RootState} from '../app/store';
import {EStatus, IAsyncData, SelectOption} from "./Select.types";
import {options} from "./Select.const";

interface ducksState {
    filterOption: IAsyncData<SelectOption[]>;
}

const initialState: ducksState = {
    filterOption: {
        data: options,
        status: EStatus.IDLE
    }

};

export const getFilterOptions = createAsyncThunk(
    'selectFilter/get',
    (search: string) => {
        return new Promise<SelectOption[]>((resolve) => {
            setTimeout(() => {
                let selectOptions: SelectOption[] = options.filter((elem) =>
                    elem.title.toLowerCase().includes(search.toLowerCase()));
                resolve(selectOptions)
            }, 1000)

        })
    })

export const selectSlice = createSlice({
    name: 'select',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getFilterOptions.pending, (draftState) => {
                draftState.filterOption.status = EStatus.LOADING;
            })
            .addCase(getFilterOptions.fulfilled, (draftState, action) => {
                draftState.filterOption.status = EStatus.SUCCESS;
                draftState.filterOption.data = action.payload;
            })
            .addCase(getFilterOptions.rejected, (draftState) => {
                draftState.filterOption.status = EStatus.ERROR;
            });
    }
});


export const selectFilter = (state: RootState) => state.select.filterOption;

export default selectSlice.reducer;
