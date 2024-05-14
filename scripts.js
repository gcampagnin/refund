// Seleciona os elementos do form.
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const expense = document.getElementById("expense")
const category = document.getElementById("category")

// Seleciona elementos da lista.
const expenseList = document.querySelector("ul")
const expensesTotal = document.querySelector("aside header h2")
const expensesQuantity = document.querySelector("aside header p span")

amount.oninput = () => {
	let value = amount.value.replace(/\D/g, "")

	value = Number(value) / 100

	amount.value = formatCurrencyBRL(value)
}

function formatCurrencyBRL(value) {
	value = value.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	})

	return value
}

form.onsubmit = (event) => {
	event.preventDefault()

	const newExpense = {
		id: new Date().getTime(),
		expense: expense.value,
		category_id: category.value,
		category_name: category.options[category.selectedIndex].text,
		amount: amount.value,
		created_at: new Date(),
	}

	expenseAdd(newExpense)
}

function expenseAdd(newExpense) {
	try {
		//Cria o elemento li para adicionar na ul.
		const expenseItem = document.createElement("li")
		expenseItem.classList.add("expense")

		// Cria o ícone da categoria com seus atributos.
		const expenseIcon = document.createElement("img")
		expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`)
		expenseIcon.setAttribute("alt", newExpense.category_name)

		// Cria a info da despesa.
		const expenseInfo = document.createElement("div")
		expenseInfo.classList.add("expense-info")

		// Cria o nome da despesa.
		const expenseName = document.createElement("strong")
		expenseName.textContent = newExpense.expense

		// Cria a categoria da despesa.
		const expenseCategory = document.createElement("span")
		expenseCategory.textContent = newExpense.category_name

		// Adiciona nome e categoria na div das informações da despesa.
		expenseInfo.append(expenseName, expenseCategory)

		// Cria o valor da despesa.
		const expenseAmount = document.createElement("span")
		expenseAmount.classList.add("expense-amount")
		expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`

		// Cria o ícone de remover
		const removeIcon = document.createElement("img")
		removeIcon.classList.add("remove-icon")
		removeIcon.setAttribute("src", "img/remove.svg")
		removeIcon.setAttribute("alt", "Remover despesa")

		// Adiciona as informações no item.
		expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon)

		// Adiciona o item na lista.
		expenseList.append(expenseItem)

		// Atualiza os totais.
		updateTotals()
	} catch (error) {
		alert("Não foi possível adicionar a despesa.")
		console.log(error)
	}
}

function updateTotals() {
	try {
		// Recupera todos os itens da lista.
		const items = expenseList.children

		// Atualiza a quantidade de itens da lista.
		expensesQuantity.textContent = `${items.length} ${items.length > 1 ? "despesas" : "despesa"}`

		// Variável para incrementar o total.
		let total = 0

		for(let item = 0; item < items.length; item++) {
			// Recupera o valor da despesa.
			const itemAmount = items[item].querySelector(".expense-amount")

			// Remove caracters não númericos e substitui a vírgula por ponto.
			let value = itemAmount.textContent.replace(/[^\d]/g, "").replace(",", ".")

			// Converte o valor para float.
			value = parseFloat(value)

			// Verifica se é um número válido.
			if(isNaN(value)) {
				return alert("Não foi possível calcular o total. O valor não parece ser um número.")
			}

			// Incrementa o valor total.
			total += Number(value)
		}


	} catch (error) {
		alert("Não foi possível atualizar os totais.")
		console.log(error)
	}
}