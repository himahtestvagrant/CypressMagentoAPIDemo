export const getAProductRequest = `{
    products(filter:  {sku: {eq: "1000342396"}}) {
      items {
        id
        brand_Id
        name
        sku
        stock_status
        only_x_left_in_stock
        meta_keyword
        meta_description
        special_price
        special_from_date
        special_to_date
        attribute_set_id
        manufacturer
        canonical_url
        product_url
        description {
          html
        }
        short_description {
          html
        }
        image {
          url
          label
          position
          disabled
        }
        small_image {
          url
          label
          position
          disabled
        }
        thumbnail {
          url
          label
          position
          disabled
        }
        ... on ConfigurableProduct {
          configurable_options {
            attribute_code
            attribute_id
            id
            label
            values {
              default_label
              label
               swatch_data{
                value
              }
              store_label
              use_default_value
              value_index
              __typename
            }
            __typename
          }
          variants {
            attributes {
              code
              value_index
            }
            product {
              id
              media_gallery_entries {
                id
                disabled
                file
                label
                position
                __typename
              }
              sku
              stock_status
              price_tiers {
                final_price {
                  value
                  currency
                }
                quantity
                discount {
                  amount_off
                  percent_off
                }
              }
              __typename
            }
          }
        }
        product_links {
          sku
          link_type
          linked_product_sku
          linked_product_type
          position
        }
        media_gallery {
          url
          label
          position
          disabled
        }
        price_range {
          minimum_price {
            regular_price {
              value
              currency
            }
            final_price {
              value
              currency
            }
          }
          maximum_price {
            discount {
              amount_off
              percent_off
            }
            fixed_product_taxes {
              label
              amount {
                value
                currency
              }
            }
          }
        }
        related_products {
          id
          name
          sku
        }
        upsell_products {
          id
          name
          sku
          price_range {
            minimum_price {
              regular_price {
                value
                currency
              }
              final_price {
                value
                currency
              }
            }
            maximum_price {
              discount {
                amount_off
                percent_off
              }
              fixed_product_taxes {
                label
                amount {
                  value
                  currency
                }
              }
            }
          }
        }
        crosssell_products {
          id
          name
          sku
        }
        rating_summary
        review_count
        reviews(pageSize: 10, currentPage: 1) {
          items {
            summary
            text
            nickname
            created_at
            average_rating
            ratings_breakdown {
              name
              value
            }
          }
        }
        categories {
          id
          name
          position
          is_anchor
          url_suffix
          cms_block {
            title
            content
            identifier
          }
        }
      }
    }
  }`