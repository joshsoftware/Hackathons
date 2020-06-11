# frozen_string_literal: true

SHOP_TYPES = { Medicines: 'MED', Grocery: 'GRC', Milk: 'MLK', Liquor: 'LIQ', Arena: 'ARN', Clinic: 'CLI', Salon: 'SAL', Bank: 'BNK' }.freeze

DISPLAY_TYPES = { en: { "Medical Store": 'MED', "Grocery Shop": 'GRC', "Milk Dairy": 'MLK',
                        "Liquor Shop": 'LIQ', Arena: 'ARN', Clinic: 'CLI', Salon: 'SAL', Bank: 'BNK' }.freeze,
                  hn: { "मेडिकल स्टोर": 'MED', "किराने की दुकान": 'GRC', "दूध डेरी": 'MLK',
                        "शराब की दुकान": 'LIQ', "खेल का मैदान": 'ARN', "क्लिनिक": 'CLI', "सैलून": 'SAL', "बैंक": 'BNK' }.freeze }.freeze
SHOP = 'Shop'
CUSTOMER = 'Customer'
