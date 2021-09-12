const loadProducts = () => {
  // const url = `https://fakestoreapi.com/products`
  const url = `../data.json`
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data))
}
loadProducts()

// show all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd)
  for (const product of allProducts) {
    const image = product.image
    const div = document.createElement("div")
    div.classList.add("product")
    div.innerHTML = `
      <div class="single-product">
        <div>
          <img class="product-image" src=${image}></img>
        </div>
        <h3>${product.title}</h3>
        <p>Category: ${product.category}</p>
        <p>Total Ratings: ${product.rating.count}</p>
        <p>Average Rating: ${product.rating.rate}</p>
        <h2>Price: $ ${product.price}</h2>
        <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-outline-success">add to cart</button>

        <div class="modal fade" id="details-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Details for: ${product.title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>

              <div class="modal-body">
                <p>Category: ${product.category}</p>
                <p>Total Ratings: ${product.rating.count}</p>
                <p>Average Rating: ${product.rating.rate}</p>
                <p>${product.description}</p>
                <h2>Price: $ ${product.price}</h2>
              </div>

              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>

        <button id="details-btn" class="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target="#details-modal">Details</button>
        
      </div>
      `
    document.getElementById("all-products").appendChild(div)
  }
}
let count = 0
const addToCart = (id, price) => {
  count = count + 1
  updatePrice("price", price)

  updateTaxAndCharge()
  document.getElementById("total-Products").innerText = count
  updateTotal()
}

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText
  const converted = parseFloat(element)
  return converted
}

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id)
  const convertPrice = parseFloat(value).toFixed(2)
  const total = convertedOldPrice + parseFloat(convertPrice)
  document.getElementById(id).innerText = total
}

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value)
}

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price")
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30)
    setInnerText("total-tax", priceConverted * 0.2)
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50)
    setInnerText("total-tax", priceConverted * 0.3)
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60)
    setInnerText("total-tax", priceConverted * 0.4)
  }
}

//grandTotal update function
const updateTotal = () => {
  const grandTotal =
    getInputValue("price") +
    getInputValue("delivery-charge") +
    getInputValue("total-tax")
  document.getElementById("total").innerText = grandTotal
}
