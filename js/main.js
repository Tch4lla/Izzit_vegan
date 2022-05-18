
function getFetch(){
  let inputVal = document.getElementById('barcode').value
  const url = `https://world.openfoodfacts.org/api/v0/product/${inputVal}.json`

  

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data)

        if(data.status === 1){
        const ITEM = new ProductInfo(data.product)
        ITEM.showInfo()
        ITEM.listIngredients()

        }else if(data.status === 0){
          alert(`Product ${inputVal} is not found in this database. Please try another`)
        }
      })
      .catch(err => {
          console.log(`error ${err}`)
      });

  class ProductInfo{
    constructor (productData){
      this.name = productData.product_name
      this.ingredients = productData.ingredients
      this.image = productData.image_url
    }
      showInfo(){
        document.getElementById('product-img').src = this.image
        document.getElementById('product-name').innerText = this.name
      }

      listIngredients(){
        let tableRef = document.getElementById('ingredient-table')
        for(let i = 1; i < tableRef.rows.length;){
          tableRef.deleteRow(i)
        }
        if(!(this.ingredients == null)){
        for(let key in this.ingredients){
          let newRow = tableRef.insertRow(-1)
          let newICell = newRow.insertCell(0)
          let newVCell = newRow.insertCell(1)

          let newIText = document.createTextNode(
            this.ingredients[key].text
          )
          let veganStatus = this.ingredients[key].vegan == null ? 'unknown' : this.ingredients[key].vegan
          let newVText = document.createTextNode(veganStatus)

          newICell.appendChild(newIText)
          newVCell.appendChild(newVText)
          if(veganStatus === 'no'){
            //turn item red
            newVCell.classList.add('non-vegan-item')
          }else if (veganStatus === 'unknown' || veganStatus === 'maybe'){
            //turn items yellow  
            newVCell.classList.add('unknown-maybe')
          }
        }
      }
    }
  }

}

