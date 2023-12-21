"use client";

import { createContext, ReactNode, useContext, useState } from "react";


interface IContextType {
    categoryFilters: string[];
    setCategoryFilters: React.Dispatch<React.SetStateAction<string[]>>;
    sort: string;
    setSort: React.Dispatch<React.SetStateAction<string>>
}

export const INITIAL_FILTER = {
    categoryFilters: [],
    setCategoryFilters: () => [],
    sort: "",
    setSort: () => ""
}

const FilterContext = createContext<IContextType>(INITIAL_FILTER);

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [categoryFilters, setCategoryFilters] = useState([]);
    const [sort, setSort] = useState("-createdAt");
    return (
        <FilterContext.Provider value={
            {
                categoryFilters,
                setCategoryFilters,
                sort,
                setSort
            }
        }>
            {children}
        </FilterContext.Provider>
    )
}


export const useFilter = () => {
    return useContext(FilterContext)
}

