// ─── ЦЕНТРАЛЬНОЕ ХРАНИЛИЩЕ В ПАМЯТИ ───────────────────────
// Все роуты читают и пишут сюда — данные едины для всех страниц

export interface Product {
  id: number;
  name: string;
  sku: string;
  category: string;
  quantity: number;
  unit: string;
  purchasePrice: number;
  minQuantity: number;
  supplier: string;
  clientName?: string;
  contractNum?: string;
  description: string;
  updatedAt: string;
}

export interface Supplier {
  id: number;
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  comment: string;
  createdAt: string;
  // Статус вычисляется динамически на основе договоров
}

export interface Transaction {
  id: number;
  type: "income" | "outcome" | "writeoff";
  product: string;
  sku: string;
  productId: number;
  quantity: number;
  unit: string;
  price: number;
  total: number;
  supplier: string;
  by: string;
  comment: string;
  date: string;
}

export interface Contract {
  id: number;
  number: string;
  status: "active" | "completed" | "expired" | "cancelled";

  // Контрагент
  clientName: string;
  clientContact: string;
  clientPhone: string;
  clientEmail: string;
  clientAddress: string;
  clientInn: string;
  clientKpp: string;
  clientOgrn: string;
  clientAccount: string;
  clientBik: string;
  clientBank: string;
  clientKorr: string;
  clientFactAddress: string;

  // Товар
  productName: string;
  productSku: string;
  quantity: number;
  unit: string;

  // Страхование
  insuranceEnabled: boolean;
  declaredValue: number;
  insurancePremium: number;
  insuranceCompany: string;

  // Хранение
  storageArea: number;
  storageRate: number;
  storageCostPerMonth: number;
  durationMonths: number;
  totalStorageCost: number;
  startDate: string;
  endDate: string;

  // Санкции
  penaltyType: "percent" | "fixed";
  penaltyPercent: number;
  penaltyPerDay: number;
  maxPenalty: number;

  notes: string;
  createdAt: string;
}

// ─── НАЧАЛЬНЫЕ ДАННЫЕ ──────────────────────────────────────

const initialSuppliers: Supplier[] = [
  { id: 1, name: "ООО Ромашка",       contact: "Иванов Иван Иванович",  phone: "+7 (495) 123-45-67", email: "ivanov@romashka.ru",    address: "г. Москва, ул. Цветочная, 5",       comment: "Долгосрочный клиент",    createdAt: "2024-10-01T09:00:00.000Z" },
  { id: 2, name: "ИП Сидоров А.В.",   contact: "Сидоров Алексей",       phone: "+7 (999) 234-56-78", email: "sidorov@mail.ru",       address: "г. Москва, ул. Торговая, 12",       comment: "Договор истёк",          createdAt: "2024-08-15T09:00:00.000Z" },
  { id: 3, name: "ООО ТехноДом",      contact: "Козлов Андрей Петрович",phone: "+7 (495) 345-67-89", email: "kozlov@technodom.ru",   address: "г. Москва, пр. Ленина, 22",         comment: "Оргтехника и расходники",createdAt: "2024-11-20T09:00:00.000Z" },
  { id: 4, name: "ЗАО МебельОпт",     contact: "Лебедева Ольга Ивановна",phone: "+7 (812) 456-78-90",email: "mebopt@lebedeva.ru",    address: "г. Санкт-Петербург, ул. Промышленная, 5", comment: "Офисная мебель",    createdAt: "2025-01-10T09:00:00.000Z" },
  { id: 5, name: "УпакСнаб",          contact: "Новиков Дмитрий",       phone: "+7 (495) 567-89-01", email: "d.novikov@upak.ru",     address: "г. Москва, Варшавское ш., 100",     comment: "Упаковочные материалы",  createdAt: "2024-09-05T09:00:00.000Z" },
  { id: 6, name: "ООО КанцОпт",       contact: "Морозова Татьяна",      phone: "+7 (499) 678-90-12", email: "t.morozova@kantopt.ru", address: "г. Москва, ул. Новая, 3",           comment: "Канцтовары оптом",       createdAt: "2024-07-01T09:00:00.000Z" },
  { id: 7, name: "ПоставщикПлюс",     contact: "Громов Виктор",         phone: "+7 (495) 789-01-23", email: "v.gromov@pplus.ru",     address: "г. Москва, ул. Складская, 18",      comment: "Бумага и блокноты",      createdAt: "2024-12-01T09:00:00.000Z" },
];

const initialContracts: Contract[] = [
  // ООО Ромашка — активный
  {
    id: 1, number: "ДХ-2025-0001", status: "active",
    clientName: "ООО Ромашка", clientContact: "Иванов Иван Иванович", clientPhone: "+7 (495) 123-45-67",
    clientEmail: "ivanov@romashka.ru", clientAddress: "г. Москва, ул. Цветочная, 5", clientInn: "7700123456",
    clientKpp: "770101001", clientOgrn: "1027700000001", clientAccount: "40702810000000000001",
    clientBik: "044525225", clientBank: "ПАО Сбербанк", clientKorr: "30101810400000000225",
    clientFactAddress: "",
    productName: "Бумага А4, 500 листов", productSku: "PAP-001", quantity: 1000, unit: "бл",
    insuranceEnabled: true, declaredValue: 250000, insurancePremium: 25000, insuranceCompany: "СтрахПро",
    storageArea: 50, storageRate: 1200, storageCostPerMonth: 60000, durationMonths: 6, totalStorageCost: 360000,
    startDate: "2025-01-15", endDate: "2025-07-15",
    penaltyType: "percent", penaltyPercent: 1.5, penaltyPerDay: 0, maxPenalty: 0,
    notes: "Хранить в сухом помещении", createdAt: "2025-01-15T09:00:00.000Z",
  },
  // ИП Сидоров — просроченный
  {
    id: 2, number: "ДХ-2024-0005", status: "expired",
    clientName: "ИП Сидоров А.В.", clientContact: "Сидоров Алексей", clientPhone: "+7 (999) 234-56-78",
    clientEmail: "sidorov@mail.ru", clientAddress: "г. Москва, ул. Торговая, 12", clientInn: "771234567890",
    clientKpp: "", clientOgrn: "312771234567890", clientAccount: "40802810000000000002",
    clientBik: "044525225", clientBank: "ПАО Сбербанк", clientKorr: "30101810400000000225",
    clientFactAddress: "",
    productName: "Картридж HP 85A", productSku: "INK-017", quantity: 50, unit: "шт",
    insuranceEnabled: false, declaredValue: 0, insurancePremium: 0, insuranceCompany: "",
    storageArea: 20, storageRate: 1500, storageCostPerMonth: 30000, durationMonths: 2, totalStorageCost: 60000,
    startDate: "2024-11-01", endDate: "2025-01-01",
    penaltyType: "fixed", penaltyPercent: 1.5, penaltyPerDay: 1500, maxPenalty: 30000,
    notes: "", createdAt: "2024-11-01T09:00:00.000Z",
  },
  // ООО ТехноДом — активный
  {
    id: 3, number: "ДХ-2025-0002", status: "active",
    clientName: "ООО ТехноДом", clientContact: "Козлов Андрей Петрович", clientPhone: "+7 (495) 345-67-89",
    clientEmail: "kozlov@technodom.ru", clientAddress: "г. Москва, пр. Ленина, 22", clientInn: "7703456789",
    clientKpp: "770301001", clientOgrn: "1027703456789", clientAccount: "40702810000000000003",
    clientBik: "044525225", clientBank: "ВТБ", clientKorr: "30101810700000000187",
    clientFactAddress: "г. Москва, пр. Ленина, 22, стр. 1",
    productName: "Картридж HP 85A", productSku: "CLT-INK-003", quantity: 200, unit: "шт",
    insuranceEnabled: true, declaredValue: 180000, insurancePremium: 18000, insuranceCompany: "СтрахПро",
    storageArea: 30, storageRate: 1200, storageCostPerMonth: 36000, durationMonths: 4, totalStorageCost: 144000,
    startDate: "2025-02-01", endDate: "2025-06-01",
    penaltyType: "percent", penaltyPercent: 2.0, penaltyPerDay: 0, maxPenalty: 0,
    notes: "Климат-контроль обязателен", createdAt: "2025-02-01T09:00:00.000Z",
  },
  // ЗАО МебельОпт — активный
  {
    id: 4, number: "ДХ-2025-0003", status: "active",
    clientName: "ЗАО МебельОпт", clientContact: "Лебедева Ольга Ивановна", clientPhone: "+7 (812) 456-78-90",
    clientEmail: "mebopt@lebedeva.ru", clientAddress: "г. Санкт-Петербург, ул. Промышленная, 5", clientInn: "7804567890",
    clientKpp: "780401001", clientOgrn: "1027804567890", clientAccount: "40702810000000000004",
    clientBik: "044030653", clientBank: "Банк ГПБ (АО)", clientKorr: "30101810200000000653",
    clientFactAddress: "",
    productName: "Офисные кресла Premium", productSku: "CLT-FRN-004", quantity: 80, unit: "шт",
    insuranceEnabled: true, declaredValue: 640000, insurancePremium: 64000, insuranceCompany: "СтрахПро",
    storageArea: 100, storageRate: 950, storageCostPerMonth: 95000, durationMonths: 12, totalStorageCost: 1140000,
    startDate: "2025-01-10", endDate: "2026-01-10",
    penaltyType: "percent", penaltyPercent: 1.5, penaltyPerDay: 0, maxPenalty: 500000,
    notes: "Паллетное хранение, высота до 3м", createdAt: "2025-01-10T09:00:00.000Z",
  },
  // УпакСнаб — завершённый
  {
    id: 5, number: "ДХ-2024-0003", status: "completed",
    clientName: "УпакСнаб", clientContact: "Новиков Дмитрий", clientPhone: "+7 (495) 567-89-01",
    clientEmail: "d.novikov@upak.ru", clientAddress: "г. Москва, Варшавское ш., 100", clientInn: "7705678901",
    clientKpp: "770501001", clientOgrn: "1027705678901", clientAccount: "40702810000000000005",
    clientBik: "044525225", clientBank: "ПАО Сбербанк", clientKorr: "30101810400000000225",
    clientFactAddress: "",
    productName: "Пакеты фасовочные 1кг", productSku: "PKG-031", quantity: 50000, unit: "шт",
    insuranceEnabled: false, declaredValue: 0, insurancePremium: 0, insuranceCompany: "",
    storageArea: 40, storageRate: 1200, storageCostPerMonth: 48000, durationMonths: 3, totalStorageCost: 144000,
    startDate: "2024-06-01", endDate: "2024-09-01",
    penaltyType: "percent", penaltyPercent: 1.5, penaltyPerDay: 0, maxPenalty: 0,
    notes: "", createdAt: "2024-06-01T09:00:00.000Z",
  },
  // ООО КанцОпт — просроченный (архивный)
  {
    id: 6, number: "ДХ-2024-0001", status: "expired",
    clientName: "ООО КанцОпт", clientContact: "Морозова Татьяна", clientPhone: "+7 (499) 678-90-12",
    clientEmail: "t.morozova@kantopt.ru", clientAddress: "г. Москва, ул. Новая, 3", clientInn: "7706789012",
    clientKpp: "770601001", clientOgrn: "1027706789012", clientAccount: "40702810000000000006",
    clientBik: "044525225", clientBank: "ПАО Сбербанк", clientKorr: "30101810400000000225",
    clientFactAddress: "",
    productName: "Ручки шариковые синие", productSku: "PEN-042", quantity: 5000, unit: "шт",
    insuranceEnabled: false, declaredValue: 0, insurancePremium: 0, insuranceCompany: "",
    storageArea: 15, storageRate: 1500, storageCostPerMonth: 22500, durationMonths: 3, totalStorageCost: 67500,
    startDate: "2024-04-01", endDate: "2024-07-01",
    penaltyType: "percent", penaltyPercent: 1.5, penaltyPerDay: 0, maxPenalty: 0,
    notes: "", createdAt: "2024-04-01T09:00:00.000Z",
  },
  // ПоставщикПлюс — активный
  {
    id: 7, number: "ДХ-2025-0004", status: "active",
    clientName: "ПоставщикПлюс", clientContact: "Громов Виктор", clientPhone: "+7 (495) 789-01-23",
    clientEmail: "v.gromov@pplus.ru", clientAddress: "г. Москва, ул. Складская, 18", clientInn: "7707890123",
    clientKpp: "770701001", clientOgrn: "1027707890123", clientAccount: "40702810000000000007",
    clientBik: "044525225", clientBank: "Альфа-Банк", clientKorr: "30101810200000000593",
    clientFactAddress: "",
    productName: "Блокноты А5 в клетку", productSku: "NTB-033", quantity: 3000, unit: "шт",
    insuranceEnabled: false, declaredValue: 0, insurancePremium: 0, insuranceCompany: "",
    storageArea: 25, storageRate: 1200, storageCostPerMonth: 30000, durationMonths: 3, totalStorageCost: 90000,
    startDate: "2025-03-01", endDate: "2025-06-01",
    penaltyType: "percent", penaltyPercent: 1.5, penaltyPerDay: 0, maxPenalty: 0,
    notes: "", createdAt: "2025-03-01T09:00:00.000Z",
  },
];

const initialProducts: Product[] = [
  // Собственные товары склада
  { id: 1,  name: "Бумага А4, 500 листов",  sku: "PAP-001", category: "Бумага и картон", quantity: 120, unit: "бл",  purchasePrice: 180, minQuantity: 20,  supplier: "ООО Ромашка",   clientName: "ООО Ромашка",     contractNum: "ДХ-2025-0001", description: "Принято по договору ДХ-2025-0001", updatedAt: new Date().toISOString() },
  { id: 2,  name: "Ручки шариковые синие",  sku: "PEN-042", category: "Канцелярия",      quantity: 8,   unit: "уп",  purchasePrice: 90,  minQuantity: 15,  supplier: "ООО КанцОпт",  clientName: "",                contractNum: "",             description: "",                                 updatedAt: new Date().toISOString() },
  { id: 3,  name: "Картридж HP 85A",        sku: "INK-017", category: "Расходники",      quantity: 2,   unit: "шт",  purchasePrice: 900, minQuantity: 5,   supplier: "ООО ТехноДом", clientName: "ООО ТехноДом",    contractNum: "ДХ-2025-0002", description: "Принято по договору ДХ-2025-0002", updatedAt: new Date().toISOString() },
  { id: 4,  name: "Маркер перманентный",    sku: "MRK-008", category: "Канцелярия",      quantity: 18,  unit: "шт",  purchasePrice: 35,  minQuantity: 10,  supplier: "ООО КанцОпт",  clientName: "",                contractNum: "",             description: "",                                 updatedAt: new Date().toISOString() },
  { id: 5,  name: "Скрепки 50мм (кор)",    sku: "CLP-003", category: "Канцелярия",      quantity: 3,   unit: "кор", purchasePrice: 25,  minQuantity: 10,  supplier: "ООО КанцОпт",  clientName: "",                contractNum: "",             description: "",                                 updatedAt: new Date().toISOString() },
  { id: 6,  name: "Папки-регистраторы А4", sku: "FLD-022", category: "Канцелярия",      quantity: 45,  unit: "шт",  purchasePrice: 85,  minQuantity: 10,  supplier: "ООО Ромашка",  clientName: "",                contractNum: "",             description: "",                                 updatedAt: new Date().toISOString() },
  { id: 7,  name: "Степлер настольный",    sku: "STL-011", category: "Канцелярия",      quantity: 12,  unit: "шт",  purchasePrice: 220, minQuantity: 5,   supplier: "ООО Ромашка",  clientName: "",                contractNum: "",             description: "",                                 updatedAt: new Date().toISOString() },
  { id: 8,  name: "Блокноты А5 в клетку",  sku: "NTB-033", category: "Бумага и картон", quantity: 4,   unit: "шт",  purchasePrice: 60,  minQuantity: 15,  supplier: "ПоставщикПлюс",clientName: "ПоставщикПлюс",   contractNum: "ДХ-2025-0004", description: "Принято по договору ДХ-2025-0004", updatedAt: new Date().toISOString() },
  { id: 9,  name: "Клей-карандаш 21г",     sku: "GLU-005", category: "Канцелярия",      quantity: 30,  unit: "шт",  purchasePrice: 45,  minQuantity: 10,  supplier: "ООО КанцОпт",  clientName: "",                contractNum: "",             description: "",                                 updatedAt: new Date().toISOString() },
  { id: 10, name: "Лоток для бумаг",        sku: "TRY-014", category: "Мебель",          quantity: 7,   unit: "шт",  purchasePrice: 280, minQuantity: 3,   supplier: "ЗАО МебельОпт",clientName: "",                contractNum: "",             description: "",                                 updatedAt: new Date().toISOString() },
  { id: 11, name: "Пакеты фасовочные 1кг", sku: "PKG-031", category: "Упаковка",        quantity: 0,   unit: "шт",  purchasePrice: 2,   minQuantity: 100, supplier: "УпакСнаб",     clientName: "",                contractNum: "",             description: "",                                 updatedAt: new Date().toISOString() },
  { id: 12, name: "Ножницы офисные 21см",  sku: "SCS-009", category: "Канцелярия",      quantity: 25,  unit: "шт",  purchasePrice: 120, minQuantity: 5,   supplier: "ООО Ромашка",  clientName: "",                contractNum: "",             description: "",                                 updatedAt: new Date().toISOString() },
  // Товары клиентов на хранении
  { id: 13, name: "Офисные кресла Premium", sku: "CLT-FRN-004", category: "Товары на хранении", quantity: 80, unit: "шт", purchasePrice: 0, minQuantity: 0, supplier: "ЗАО МебельОпт", clientName: "ЗАО МебельОпт", contractNum: "ДХ-2025-0003", description: "Принято по договору ДХ-2025-0003", updatedAt: new Date().toISOString() },
  { id: 14, name: "Картридж HP 85A (ТехноДом)", sku: "CLT-INK-003", category: "Товары на хранении", quantity: 200, unit: "шт", purchasePrice: 0, minQuantity: 0, supplier: "ООО ТехноДом", clientName: "ООО ТехноДом", contractNum: "ДХ-2025-0002", description: "Принято по договору ДХ-2025-0002", updatedAt: new Date().toISOString() },
];

const now = new Date();
const dAgo = (n: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() - n);
  return d.toLocaleString("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

const initialTransactions: Transaction[] = [
  { id: 1,  type: "income",   product: "Бумага А4, 500 листов",       sku: "PAP-001",     productId: 1,  quantity: 50,  unit: "бл",  price: 0,   total: 0,       supplier: "ООО Ромашка",    by: "Алексей И.", comment: "Приём по ДХ-2025-0001",     date: dAgo(0)  },
  { id: 2,  type: "outcome",  product: "Ручки шариковые синие",        sku: "PEN-042",     productId: 2,  quantity: 10,  unit: "уп",  price: 150, total: 1500,    supplier: "",               by: "Мария С.",   comment: "Для отдела продаж",          date: dAgo(0)  },
  { id: 3,  type: "writeoff", product: "Картридж HP 85A",              sku: "INK-017",     productId: 3,  quantity: 2,   unit: "шт",  price: 900, total: 1800,    supplier: "",               by: "Алексей И.", comment: "Закончился ресурс",          date: dAgo(0)  },
  { id: 4,  type: "income",   product: "Маркер перманентный",          sku: "MRK-008",     productId: 4,  quantity: 100, unit: "шт",  price: 35,  total: 3500,    supplier: "ООО КанцОпт",   by: "Иван П.",    comment: "",                           date: dAgo(1)  },
  { id: 5,  type: "outcome",  product: "Скрепки 50мм (кор)",          sku: "CLP-003",     productId: 5,  quantity: 5,   unit: "кор", price: 50,  total: 250,     supplier: "",               by: "Мария С.",   comment: "",                           date: dAgo(1)  },
  { id: 6,  type: "income",   product: "Офисные кресла Premium",       sku: "CLT-FRN-004", productId: 13, quantity: 80,  unit: "шт",  price: 0,   total: 0,       supplier: "ЗАО МебельОпт",  by: "Иван П.",    comment: "Приём по ДХ-2025-0003",     date: dAgo(2)  },
  { id: 7,  type: "outcome",  product: "Бумага А4, 500 листов",        sku: "PAP-001",     productId: 1,  quantity: 15,  unit: "бл",  price: 250, total: 3750,    supplier: "",               by: "Алексей И.", comment: "Бухгалтерия",                date: dAgo(3)  },
  { id: 8,  type: "income",   product: "Картридж HP 85A (ТехноДом)",  sku: "CLT-INK-003", productId: 14, quantity: 200, unit: "шт",  price: 0,   total: 0,       supplier: "ООО ТехноДом",  by: "Иван П.",    comment: "Приём по ДХ-2025-0002",     date: dAgo(5)  },
  { id: 9,  type: "income",   product: "Блокноты А5 в клетку",         sku: "NTB-033",     productId: 8,  quantity: 3000,unit: "шт",  price: 0,   total: 0,       supplier: "ПоставщикПлюс", by: "Иван П.",    comment: "Приём по ДХ-2025-0004",     date: dAgo(7)  },
  { id: 10, type: "outcome",  product: "Ножницы офисные 21см",         sku: "SCS-009",     productId: 12, quantity: 5,   unit: "шт",  price: 120, total: 600,     supplier: "",               by: "Мария С.",   comment: "",                           date: dAgo(9)  },
  { id: 11, type: "income",   product: "Бумага А4, 500 листов",        sku: "PAP-001",     productId: 1,  quantity: 200, unit: "бл",  price: 0,   total: 0,       supplier: "ООО Ромашка",   by: "Алексей И.", comment: "Доп. приём по ДХ-2025-0001",date: dAgo(14) },
  { id: 12, type: "writeoff", product: "Ручки шариковые синие",        sku: "PEN-042",     productId: 2,  quantity: 3,   unit: "уп",  price: 90,  total: 270,     supplier: "",               by: "Мария С.",   comment: "Пересохли",                  date: dAgo(20) },
];

// ─── САМО ХРАНИЛИЩЕ ────────────────────────────────────────
export const store = {
  products:     [...initialProducts]     as (Product & Record<string, any>)[],
  suppliers:    [...initialSuppliers]    as Supplier[],
  transactions: [...initialTransactions] as Transaction[],
  contracts:    [...initialContracts]    as Contract[],

  _nextId: {
    products:     initialProducts.length + 1,
    suppliers:    initialSuppliers.length + 1,
    transactions: initialTransactions.length + 1,
    contracts:    initialContracts.length + 1,
  },

  nextId(entity: keyof typeof this._nextId): number {
    return this._nextId[entity]++;
  },
};