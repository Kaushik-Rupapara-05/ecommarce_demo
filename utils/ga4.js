export function fireSelectItemGtm(details) {

    dataLayer.push({
        event: "select_item",
        currency: "INR",
        value: details.value, // selling price
        items: [
            {
                item_id: details.item_id, // product SKU
                item_name: details.item_name, // title
                affiliation: "Perrian Store",
                currency: "INR",
                discount: details.discount, // discount 
                index: details.index,
                item_brand: "Perrian", // Website or Brand
                item_category: details.item_category, // Product Category
                item_category2: details.item_category2,  // Product Sub Category
                item_category3: details.item_category3, // Product Type (jewellery, coin)
                item_list_id: details.item_list_id,// where it come from
                item_list_name: details.item_list_name,// where it come from
                item_variant: details.item_variant, // Child SKU
                price: details.price // price
            }
        ]
    })
}