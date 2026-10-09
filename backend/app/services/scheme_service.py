from typing import List
from backend.app.schemas.market import SchemeItem

GOVERNMENT_SCHEMES_DATA: List[SchemeItem] = [
    SchemeItem(
        id="pm-kisan",
        name_en="Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        name_hi="प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)",
        name_mr="प्रधानमंत्री किसान सन्मान निधी (PM-KISAN)",
        ministry="Ministry of Agriculture and Farmers Welfare, Govt. of India",
        target_beneficiaries="All small and marginal landholding farmer families with cultivable land.",
        brief_description_en="Direct income support of ₹6,000 per year paid in three equal four-monthly installments of ₹2,000 directly into the bank accounts of eligible farmer families.",
        brief_description_hi="पात्र किसान परिवारों के बैंक खातों में प्रत्यक्ष लाभ अंतरण (DBT) के माध्यम से प्रति वर्ष ₹6,000 की वित्तीय सहायता (तीन 4-मासिक किस्तों में ₹2,000)।",
        brief_description_mr="पात्र शेतकरी कुटुंबांच्या बँक खात्यात थेट ₹६,००० प्रति वर्ष (₹२,००० च्या तीन हप्त्यांमध्ये) आर्थिक सहाय्य.",
        key_benefits="₹6,000 annual direct cash support via Aadhaar-linked DBT for agricultural inputs and family needs.",
        eligibility_criteria="Farmer family with cultivable land records in state land registry. Institutional landholders and high-income income-tax payees are excluded.",
        official_portal_url="https://pmkisan.gov.in",
        last_verified_date="January 2025"
    ),
    SchemeItem(
        id="pmfby",
        name_en="Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        name_hi="प्रधानमंत्री फसल बीमा योजना (PMFBY)",
        name_mr="प्रधानमंत्री पीक विमा योजना (PMFBY)",
        ministry="Ministry of Agriculture and Farmers Welfare, Govt. of India",
        target_beneficiaries="Farmers growing notified crops in notified areas (both loanee and non-loanee farmers).",
        brief_description_en="Comprehensive crop insurance cover against non-preventable natural risks (drought, flood, unseasonal rain, pests, post-harvest losses) at minimal uniform farmer premiums.",
        brief_description_hi="प्राकृतिक आपदाओं (सूखा, बाढ़, ओलावृष्टि, कीट प्रकोप) से फसल नुकसान के विरुद्ध व्यापक बीमा सुरक्षा। खरीफ फसलों हेतु 2%, रबी हेतु 1.5% एवं वाणिज्यिक फसलों हेतु 5% अधिकतम किसान प्रीमियम।",
        brief_description_mr="नैसर्गिक आपत्तींमुळे (दुष्काळ, पूर, अवकाळी पाऊस, कीड) होणाऱ्या पीक नुकसानीपासून सर्वसमावेशक विमा संरक्षण. खरीप पिकांसाठी २%, रब्बीसाठी १.५% अत्यल्प प्रीमियम.",
        key_benefits="Low premium rates (2% Kharif food crops, 1.5% Rabi, 5% annual commercial/horticulture). Balance premium shared by Central & State governments.",
        eligibility_criteria="Farmers cultivating notified crops in designated insurance units. Must apply before seasonal cut-off date with land record (7/12 extract) and sowing certificate.",
        official_portal_url="https://pmfby.gov.in",
        last_verified_date="February 2025"
    ),
    SchemeItem(
        id="soil-health-card",
        name_en="Soil Health Card Scheme (SHC)",
        name_hi="मृदा स्वास्थ्य कार्ड योजना (Soil Health Card)",
        name_mr="मृदा आरोग्य पत्रिका योजना (Soil Health Card)",
        ministry="Department of Agriculture & Farmers Welfare, Govt. of India",
        target_beneficiaries="All farmers across India possessing agricultural land holdings.",
        brief_description_en="Provides farmers with soil test-based crop-wise fertilizer recommendations for 12 essential chemical parameters (N, P, K, S, Zn, Fe, Cu, Mn, Bo, pH, EC, OC) to prevent overuse of chemical fertilizers.",
        brief_description_hi="किसानों को उनकी खेत की मिट्टी की उर्वरता स्थिति (12 मुख्य पोषक तत्व) की जानकारी एवं फसल अनुसार संतुलित खाद-उर्वरक उपयोग की वैज्ञानिक सलाह उपलब्ध कराना।",
        brief_description_mr="शेतकऱ्यांना त्यांच्या शेतातील मातीची सुपिकता (१२ रासायनिक घटक) आणि पीकानुसार योग्य खतांचा समतोल वापर याबद्दल मार्गदर्शक पत्रिका दिली जाते.",
        key_benefits="Reduces fertilizer expenditure by 15-20%, prevents soil degradation, and increases crop productivity.",
        eligibility_criteria="All landholding farmers. Soil samples collected by agricultural department field assistants every 3 years free or at nominal laboratory fee.",
        official_portal_url="https://soilhealth.dac.gov.in",
        last_verified_date="December 2024"
    ),
    SchemeItem(
        id="kcc",
        name_en="Kisan Credit Card (KCC) Scheme",
        name_hi="किसान क्रेडिट कार्ड (KCC)",
        name_mr="किसान क्रेडिट कार्ड (KCC)",
        ministry="Ministry of Finance & Ministry of Agriculture and Farmers Welfare, Govt. of India",
        target_beneficiaries="Individual farmers, joint liability groups, tenant farmers, and self-help groups.",
        brief_description_en="Provides timely and adequate credit to farmers from the banking system for crop cultivation expenses, post-harvest costs, and maintenance of farm assets at concessional interest rates.",
        brief_description_hi="किसानों को खेती की लागत, बीज, खाद व कीटनाशक खरीदने हेतु रियायती ब्याज दर (ब्याज अनुदान सहित प्रभावी 4% दर पर समय पर पुनर्भुगतान करने पर) पर आसान ऋण सुविधा।",
        brief_description_mr="शेतकऱ्यांना शेती खर्च, बी-बियाणे, खते यासाठी सवलतीच्या व्याजदराने (वेळेवर परतफेड केल्यास प्रभावी ४% व्याजदर) सहज बँक कर्ज उपलब्ध करून दिले जाते.",
        key_benefits="Collateral-free credit limit up to ₹1.60 lakh (up to ₹3 lakh with prompt repayment incentive at 4% net interest). Flexible repayment aligned to harvesting seasons.",
        eligibility_criteria="All farmers, sharecroppers, and animal husbandry / fishery farmers with valid identity and operational land proof.",
        official_portal_url="https://myscheme.gov.in/schemes/kcc",
        last_verified_date="January 2025"
    ),
    SchemeItem(
        id="namo-shetkari",
        name_en="Namo Shetkari Mahasanman Nidhi Yojana (Maharashtra)",
        name_hi="नमो शेतकरी महासम्मान निधि योजना (महाराष्ट्र)",
        name_mr="नमो शेतकरी महासन्मान निधी योजना (महाराष्ट्र)",
        ministry="Department of Agriculture, Government of Maharashtra",
        target_beneficiaries="Eligible farmers of Maharashtra registered under PM-KISAN.",
        brief_description_en="State-level top-up providing an additional ₹6,000 per year (in three installments of ₹2,000) directly to farmers in Maharashtra alongside PM-KISAN, bringing total direct income support to ₹12,000 annually.",
        brief_description_hi="महाराष्ट्र सरकार द्वारा पीएम-किसान के अतिरिक्त प्रति वर्ष ₹6,000 की पूरक आर्थिक सहायता, जिससे राज्य के किसानों को कुल ₹12,000 सालाना आय सहायता मिलती है।",
        brief_description_mr="महाराष्ट्र शासनाकडून पीएम-किसान योजनेव्यतिरिक्त अतिरिक्त ₹६,००० प्रति वर्ष थेट बँक खात्यात जमा केले जातात. यामुळे एकूण ₹१२,००० वार्षिक आर्थिक लाभ मिळतो.",
        key_benefits="Additional ₹6,000 annual direct benefit transfer alongside central PM-KISAN.",
        eligibility_criteria="Beneficiary must be an active eligible beneficiary in Maharashtra state under PM-KISAN with active bank e-KYC.",
        official_portal_url="https://krishi.maharashtra.gov.in",
        last_verified_date="January 2025"
    )
]

def get_government_schemes() -> List[SchemeItem]:
    return GOVERNMENT_SCHEMES_DATA
