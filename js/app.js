// loading API
const loadProducts = () => {
  const url = `https://raw.githubusercontent.com/ProgrammingHero1/ranga-store-api/main/ranga-api.json?fbclid=IwAR0fLdtCA8re4lXTCnVYR0ppmbcj0q3I4oQ4k-yylzMm8AplnhnSDMFbgoc`
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data))
}
loadProducts()

// showing all product in UI
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd)
  for (const product of allProducts) {
    const image = product.image
    const div = document.createElement("div")
    div.classList.add("product")
    // HTML element
    div.innerHTML = `
      <div class="single-product">

        <div>
          <img class="product-image" src=${image}></img>
          <h3>${product.title}</h3>
          <p>Category: ${product.category}</p>
          <p>Total Ratings: <span class="total-rating">${product.rating.count}</span></p>
          <p>
            Rating: 
              <span class="stars-outer">
                <span id="product-${product.id}" class="stars-inner"></span>
              </span>
              <span class="number-rating">(${product.rating.rate})</span>
          </p>
        </div>

        <div class="footer">
          <h2>Price: $ ${product.price}</h2>
          <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn add-to-cart">Add to cart</button>
          <button id="details-btn" class="btn details-btn">Details</button>
        </div>
        
      </div>
      `
    // appending html
    document.getElementById("all-products").appendChild(div)
    // star rating
    const starPercentage = (parseFloat(product.rating.rate) / 5) * 100
    const starPercentageRounded = `${Math.round(starPercentage / 10) * 10}%`
    // setting inner stars width
    document.getElementById(`product-${product.id}`).style.width =
      starPercentageRounded
  }
}
// adding to cart
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
  console.log(converted)
  return converted
}

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id)
  const convertPrice = parseFloat(value)
  const total = convertedOldPrice + convertPrice
  document.getElementById(id).innerText = parseFloat(total).toFixed(2)
}

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = parseFloat(value).toFixed(2)
}

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price")
  if (priceConverted > 0) {
    setInnerText("delivery-charge", 20)
  }
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
  document.getElementById("total").innerText = parseFloat(grandTotal).toFixed(2)
}
