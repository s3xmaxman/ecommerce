'use client'

import React from 'react'

import { Category } from '../../../../payload/payload-types'
import { Checkbox } from '../../../_components/Checkbox'
import { HR } from '../../../_components/HR'
import { RadioButton } from '../../../_components/Radio'
import { useFilter } from '../../../_providers/Filter'

import classes from './index.module.scss'

const Filters = ({ categories }: { categories: Category[] }) => {
  // useFilter フックからフィルタリングとソートに関する状態と更新関数を取得します
  const { categoryFilters, sort, setCategoryFilters, setSort } = useFilter()

  // handleCategories はカテゴリフィルタの状態を更新する関数です
  // 引数 categoryId が現在のフィルタリングされたカテゴリに含まれているかをチェックします
  const handleCategories = (categoryId: string) => {
    // もし categoryId が既に含まれていれば、それを除外した新しい配列を作成して設定します
    if (categoryFilters.includes(categoryId)) {
      const updatedCategories = categoryFilters.filter(id => id !== categoryId)

      setCategoryFilters(updatedCategories)
    } else {
      // categoryId が含まれていなければ、新しい categoryId を追加して更新します
      setCategoryFilters([...categoryFilters, categoryId])
    }
  }

  // handleSort はソートの状態を更新する関数です
  // 引数 value で受け取ったソートオプションをセットします
  const handleSort = (value: string) => setSort(value)

  return (
    <div className={classes.filters}>
      <div>
        <h6 className={classes.title}>Product Categories</h6>
        <div className={classes.categories}>
          {categories.map(category => {
            const isSelected = categoryFilters.includes(category.id)

            return (
              <Checkbox
                key={category.id}
                label={category.title}
                value={category.id}
                isSelected={isSelected}
                onClickHandler={handleCategories}
              />
            )
          })}
        </div>
        <HR className={classes.hr} />
        <h6 className={classes.title}>Sort By</h6>
        <div className={classes.categories}>
          <RadioButton
            label="Latest"
            value="-createdAt"
            isSelected={sort === '-createdAt'}
            onRadioChange={handleSort}
            groupName="sort"
          />
          <RadioButton
            label="Oldest"
            value="createdAt"
            isSelected={sort === 'createdAt'}
            onRadioChange={handleSort}
            groupName="sort"
          />
        </div>
      </div>
    </div>
  )
}

export default Filters