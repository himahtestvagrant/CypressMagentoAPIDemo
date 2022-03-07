///<reference types="cypress"/>
const fs = require('fs');
const csv = require("csvtojson");
const { Parser } = require("json2csv");
//const syncDelay=(milliseconds)=>{
// var start = new Date().getTime();
// var end=0;
// while( (end-start) < milliseconds){
//     end = new Date().getTime();
// }
//}
const writeCsv= async ({ path, uniqueGroupId }) => {
                    const csvFile =await csv().fromFile(path);
//                    console.log("unique group id is : "+csvFile[0].unique_group_id);
                    csvFile[0].unique_group_id = getUniqueGroupId();
//                    csvFile = JSON.stringify(csvFile)
                    const productInCsv =await new Parser({ fields: ["sku","attribute_set_code","department","class","subclass","brand_Id","brand_collection","vendor_sku_id","unique_group_id","vendor_sku_title","barcode","brand_color","ebo_color","ebo_size","description","hsn_code","seller_tax_rate","mrp","suggested_selling_price","warranty_in_months","is_returnable","return_window_in_days","primary_image_url","additional_image_url","video_url","user_manual_url","user_manual_title","replenishability","brand_grading","ebo_grading","vendor_purchase_mode","is_active_for_sale","is_lot_controlled","lot_control_parameters","package_weight_in_kg","package_width_in_cm","package_height_in_cm","sale_uom","sale_moq_b2b","case_config","is_fragile","is_dangerous","country_of_origin","manufactured_by","packed_by","imported_by","marketed_by","customer_care_address","vendor_moq","vendor_lead_time_in_days","vendor_tot_margin_pct","vendor_product_mrp","vendor_uom","vendor_list_price","vendor_tot_price_type","vendor_hsn_code","ebo_product_type","is_bom","fulfillment_method","is_default","key_features","meta_description","sale_moq_b2c","per_unit_price_applicable","per_unit_price_divisor","lead_time_in_days","seller_hsn_code","weight","weight_type","visibility","credit_type","has_shelf_life","is_published","is_sellable","package_dimension_verified","allowed_channels","ebo_status","brand_model_number","vendor_id","pack_of","material_drop","module_md","power_md","rated_current","step_md","type_drop","voltage"] }).parse(csvFile);
                    await fs.writeFileSync("./cypress/fixtures/product.csv", productInCsv);
                    return "";
}

const getUniqueGroupId = () =>{
    const today = new Date();
    let yyyy = today.getFullYear().toString();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    let number = Math.floor(Math.random() * 20);
    let uniqueGroupId = dd+mm+yyyy+"-fan-"+number;
    return uniqueGroupId;
}

//module.exports.writeCsv = writeCsv;
module.exports = {
    writeCsv,
}
