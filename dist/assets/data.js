/* ==========================================================
PARADISE KAFÉ — SITE CONTENT
Edit this file to update prices, menu items and seasonal
drinks. No other file needs to change.
========================================================== */
window.PK = {
/* ---------- SEASONAL DRINKS ----------
To launch a new season: add an entry below (copy "fall"),
then set `current` to its key. The previous season becomes
a "past" tab automatically.
cup layers are listed bottom -> top. type: "iced" | "hot"   */
seasons: {
current: "fall",
order: ["fall", "summer"],
fall: {
label: "Fall", year: "2026",
title: "Fall Specials",
blurb: "Cozy, spiced and maple-kissed. Our autumn lineup is here for a limited run, so stop by before the leaves are gone.",
leaves: ["#d98a1e", "#b5531c", "#e8b23a", "#8c3a16"],
drinks: [
{ name: "Pumpkin Pie Matcha", desc: "Our matcha meets warm pumpkin-pie spice for fall in a cup.", glow: "rgba(217,120,30,.55)", cup: { type: "iced", layers: [["#e0873a", .3], ["#f3e6cf", .3], ["#8fb35a", .28]], top: "cream", dust: "#b8642a" } },
{ name: "Toasted Marshmallow Matcha", desc: "Velvety matcha crowned with a toasty, campfire-sweet finish.", glow: "rgba(242,210,150,.55)", cup: { type: "iced", layers: [["#f3e6cf", .38], ["#93b85c", .34]], top: "marsh" } },
{ name: "Brown Sugar Maple Latte", desc: "Espresso and milk with deep brown-sugar and maple warmth.", glow: "rgba(170,100,40,.6)", cup: { type: "iced", layers: [["#a0602a", .26], ["#d9b48a", .32], ["#6b3a1c", .22]], top: "cream", dust: "#7a4a22" } },
{ name: "Maple Matcha", desc: "Bright green matcha mellowed with a pour of golden maple.", glow: "rgba(200,160,60,.55)", cup: { type: "iced", layers: [["#d79a3a", .22], ["#f1e5cc", .3], ["#86ad52", .3]] } },
{ name: "Pakistani Chai", desc: "A rich, spiced, slow-brewed chai served steaming hot.", glow: "rgba(200,120,70,.55)", cup: { type: "hot", color: "#c58a5a" } }
]
},
summer: {
label: "Summer", year: "2026",
title: "Summer Specials",
blurb: "This summer's lineup has wrapped. Keep an eye on our Instagram for when these favourites return.",
leaves: ["#fa7e1e", "#d62976", "#feda75", "#9cc25f"],
drinks: [
{ name: "Strawberry Shortcake Matcha", desc: "16oz only.", price: "$6.50", glow: "rgba(240,120,140,.55)", cup: { type: "iced", layers: [["#e9637a", .26], ["#f5e9dc", .3], ["#8fb35a", .28]], top: "cream", dust: "#e9637a" } },
{ name: "Sunset Strawberry Mango Latte", desc: "16oz only.", price: "$6.50", glow: "rgba(250,150,60,.55)", cup: { type: "iced", layers: [["#e9637a", .22], ["#f5a524", .22], ["#ecd4b0", .36]] } },
{ name: "Salted Caramel Coconut Latte", desc: "16oz only.", price: "$6.50", glow: "rgba(230,180,110,.5)", cup: { type: "iced", layers: [["#c8833a", .22], ["#f3eadb", .34], ["#9a6a3a", .24]], top: "cream", dust: "#c8833a" } }
]
}
},
matcha: [
{ name: "Strawberry Matcha", p: ["$5.25", "$6.50"], tint: "#5a2230", shadow: "rgba(233,99,122,.55)", layers: [["#e9637a", .28], ["#f3e9dc", .28], ["#8fb35a", .28]] },
{ name: "Mango Matcha", p: ["$5.25", "$6.50"], tint: "#5a3a12", shadow: "rgba(245,165,36,.55)", layers: [["#f5a524", .28], ["#f3e9dc", .28], ["#8fb35a", .28]] },
{ name: "Coconut Matcha", p: ["$5.25", "$6.50"], tint: "#3d4a33", shadow: "rgba(240,235,220,.4)", layers: [["#faf5ea", .44], ["#93b85c", .4]], top: "flakes" },
{ name: "Dubai Chocolate Matcha", p: ["$5.95", "$6.95"], tint: "#3a2414", shadow: "rgba(120,70,40,.6)", layers: [["#5a3420", .22], ["#7fae4a", .16], ["#f0e4d2", .24], ["#8fb35a", .24]], top: "cream", dust: "#6a8f3a" },
{ name: "Mango Coconut Matcha", p: ["$5.50", "$6.50"], tint: "#4a3a14", shadow: "rgba(245,190,80,.55)", layers: [["#f5a524", .24], ["#faf5ea", .3], ["#8fb35a", .3]], top: "flakes" },
{ name: "Blueberry Lavender Matcha", p: ["$5.50", "$6.50"], tint: "#2e2650", shadow: "rgba(150,130,220,.55)", layers: [["#6a4fb0", .26], ["#c9b8ea", .26], ["#8fb35a", .3]] }
],
/* ---------- FULL MENU ----------
p: single price, or [12oz, 16oz]. null = not offered. */
menu: [
{ id: "coffee", title: "Coffee & Tea", items: [
{ n: "Espresso", p: "$2.50" },
{ n: "Americano", p: ["$3.95", "$4.50"] },
{ n: "Cappuccino", p: ["$4.00", "$5.00"] },
{ n: "Cold Brew", p: "$5.75" },
{ n: "Karak Chai", p: ["$4.95", "$5.95"] },
{ n: "Arabic Coffee", p: "$4.50" },
{ n: "Egyptian Tea", p: "$4.00" },
{ n: "Earl Grey Tea", p: "$4.50" },
{ n: "Green Tea", p: "$4.50" },
{ n: "Hot Chocolate", p: ["$4.25", "$5.25"] },
{ n: "Chai Latte", p: "$5.25" },
{ n: "Iced Coffee", d: "Any syrup", p: "$4.50" }
]},
{ id: "lattes", title: "Signature Lattes", sizes: true, items: [
{ n: "Spanish Latte", p: ["$5.75", "$6.25"] },
{ n: "Tiramisu Latte", p: ["$5.50", "$6.50"] },
{ n: "Salted Honey Date Latte", p: ["$5.95", "$6.95"] },
{ n: "Pistachio Dream Latte", d: "Pistachio syrup, nutty drizzle, crushed pistachio, optional cream foam", p: ["$5.95", "$6.95"], tag: "Fan fave" },
{ n: "Biscoff Bliss Latte", p: ["$5.95", "$6.50"] },
{ n: "Cocoberry Latte", d: "Coconut and strawberry, served chilled for a tropical sip", p: ["$4.95", "$5.95"] },
{ n: "French Hazel Latte", d: "Smooth steamed milk with a subtle vanilla-hazelnut blend", p: ["$4.99", "$5.99"] },
{ n: "Kinder Mocha Bliss Latte", d: "Rich chocolate and hazelnut with a sweet, crunchy finish", p: ["$5.95", "$6.50"] },
{ n: "Crème Brûlée Latte", p: ["$5.95", "$6.50"] },
{ n: "Strawberry Shortcake Latte", p: ["$5.95", "$6.50"] },
{ n: "Blueberry Lavender Latte", p: ["$5.50", "$6.50"] }
]},
{ id: "matcha", title: "Matcha", sizes: true, items: [
{ n: "Strawberry Matcha", p: ["$5.25", "$6.50"] },
{ n: "Mango Matcha", p: ["$5.25", "$6.50"] },
{ n: "Coconut Matcha", p: ["$5.25", "$6.50"] },
{ n: "Dubai Chocolate Matcha", p: ["$5.95", "$6.95"], tag: "Must try" },
{ n: "Mango Coconut Matcha", p: ["$5.50", "$6.50"] },
{ n: "Blueberry Lavender Matcha", p: ["$5.50", "$6.50"] }
]},
{ id: "refreshers", title: "Refreshers & Mojitos", sub: "All 16oz", items: [
{ n: "Mango Mint", p: "$5.25" },
{ n: "Strawberry Mint", p: "$5.25" },
{ n: "Mango Passion Fruit", p: "$6.25" },
{ n: "Blue Lagoon", p: "$6.25" },
{ n: "Blueberry Red Bull", p: "$6.25" }
]},
{ id: "croissants", title: "Croissants & Crêpes", sub: "Every flavour comes as a crêpe or a croissant", items: [
{ n: "Kinder Bueno Magic", d: "Kinder Bueno cream and Nutella, crushed chocolate, powdered sugar", p: "$6.00" },
{ n: "Nutella Paradise", d: "Nutella, fresh banana and strawberries, chocolate drizzle", p: "$6.00" },
{ n: "Biscoff Bliss", d: "Creamy Biscoff, crushed cookies, syrup drizzle", p: "$6.00" },
{ n: "Pistachio Dream", d: "Pistachio paste, crushed pistachios, pistachio syrup", p: "$6.95" },
{ n: "Nutty Professor", p: "$6.95" },
{ n: "Plain Croissant", p: "$2.00" }
]},
{ id: "desserts", title: "Desserts", items: [
{ n: "Baklava", p: "$3.50" },
{ n: "Tiramisu Cake", p: "$6.99" },
{ n: "Tres Leches Cake", p: "$6.99" },
{ n: "Dubai Chocolate Cheesecake Cup", p: "$5.00" },
{ n: "Baklava Cheesecake Cup", p: "$5.00" },
{ n: "Fruit Mousse Cake", p: "$10.00" }
]},
{ id: "pies", title: "Fresh Baked Pies", items: [
{ n: "Cheese Pie", p: "$5.25" },
{ n: "Zaatar Pie", p: "$3.50" },
{ n: "Meat Pie", p: "$6.50" }
]},
{ id: "food", title: "Food", items: [
{ n: "Turkey Sandwich", p: "$8.00" },
{ n: "Hummus w/ Pita", p: "$7.00" },
{ n: "Hummus Toast", p: "$6.50" }
]}
],
milks: ["Whole", "Oat", "Almond", "Soy", "Lactose-free", "Skim", "Half & half"],
sweets: [
{ name: "nutella paradise", price: "$6.00", desc: "Nutella layered with fresh banana and strawberries, finished with powdered sugar and a chocolate drizzle.", drizzle: "#4a2614", fruit: ["#e9384f", "#f2d36b"] },
{ name: "kinder bueno magic", price: "$6.00", desc: "Smooth Kinder Bueno cream and Nutella, topped with crushed chocolate and a dusting of powdered sugar.", drizzle: "#6b3a1c", fruit: ["#f3e6cf", "#5a3420"] },
{ name: "biscoff bliss", price: "$6.00", desc: "Creamy Biscoff topped with crushed cookies, a syrup drizzle and powdered sugar.", drizzle: "#b86b2a", fruit: ["#c98a46", "#e7b77a"] },
{ name: "pistachio dream", price: "$6.95", desc: "Rich pistachio paste and crushed pistachios, finished with a sweet pistachio syrup drizzle.", drizzle: "#8fb35a", fruit: ["#9cc25f", "#6f9440"] }
],
hours: { weekday: [8, 17], weekend: [9, 21], tz: "America/New_York" }
};