import React from 'react'
import {VictoryPie, VictoryLabel} from 'victory'
import { useGlobalState } from '../context/GlobalState'

function ExpenseChart() {

    const {transactions} = useGlobalState()
    const total = transactions.reduce(
        (acc, transaction)=>(acc += transaction.amount), 0)
    const income = transactions
        .filter(item => item.amount > 0)
        .reduce((acc, item) => (acc += item.amount), 0)
    const expense = transactions
        .filter(item => item.amount < 0)
        .reduce((acc, item) => (acc += item.amount), 0) * -1

    const totalExpense = Math.round((expense / income) * 100)
    const totalIncome = Math.round(100 - totalExpense)
  return (
    <VictoryPie 
        colorScale={["#e74c13", "#2ecc71"]}
        data={[
            {x: "Expenses", y: totalExpense},
            {x: "Incomes", y: totalIncome}
        ]}

        animate={{
            duration: 200
        }}
        labels={({datum}) => `${datum.y} %`}
        labelComponent={<VictoryLabel
        angle={45}
        style={{
            fill: "white"
        }}
    />}/>
  )
}

export default ExpenseChart