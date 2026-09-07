import type {
  ApiResult,
  MenuItem,
  StockUpdatePayload,
} from "@/types/menuItem";

const MOCK_DELAY = 800;
const ERROR_PROBABILITY = 0.2;

let menuItems: MenuItem[] = [
  {
    id: "1",
    title: "Паста Карбонара",
    category: "Кухня",
    stock: 8,
  },
  {
    id: "2",
    title: "Борщ",
    category: "Кухня",
    stock: 0,
  },
  {
    id: "3",
    title: "Цезарь с курицей",
    category: "Кухня",
    stock: 4,
  },
  {
    id: "4",
    title: "Стейк Рибай",
    category: "Кухня",
    stock: 12,
  },
  {
    id: "5",
    title: "Пицца Маргарита",
    category: "Кухня",
    stock: 3,
  },
  {
    id: "6",
    title: "Лимонад",
    category: "Бар",
    stock: 15,
  },
  {
    id: "7",
    title: "Капучино",
    category: "Бар",
    stock: 5,
  },
  {
    id: "8",
    title: "Эспрессо",
    category: "Бар",
    stock: 20,
  },
  {
    id: "9",
    title: "Мохито",
    category: "Бар",
    stock: 0,
  },
  {
    id: "10",
    title: "Апероль Шприц",
    category: "Бар",
    stock: 7,
  },
  {
    id: "11",
    title: "Чизкейк",
    category: "Десерты",
    stock: 6,
  },
  {
    id: "12",
    title: "Тирамису",
    category: "Десерты",
    stock: 2,
  },
  {
    id: "13",
    title: "Панна-котта",
    category: "Десерты",
    stock: 0,
  },
  {
    id: "14",
    title: "Шоколадный фондан",
    category: "Десерты",
    stock: 9,
  },
  {
    id: "15",
    title: "Мороженое",
    category: "Десерты",
    stock: 4,
  },
  {
    id: "16",
    title: "Том Ям",
    category: "Кухня",
    stock: 10,
  },
  {
    id: "17",
    title: "Поке с лососем",
    category: "Кухня",
    stock: 1,
  },
  {
    id: "18",
    title: "Греческий салат",
    category: "Кухня",
    stock: 11,
  },
  {
    id: "19",
    title: "Апельсиновый фреш",
    category: "Бар",
    stock: 3,
  },
  {
    id: "20",
    title: "Малиновый морс",
    category: "Бар",
    stock: 8,
  },
];

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

function shouldFail(): boolean {
  return Math.random() < ERROR_PROBABILITY;
}

export async function fetchMenuItems(): Promise<ApiResult<MenuItem[]>> {
  await delay(MOCK_DELAY);

  if (shouldFail()) {
    return {
      ok: false,
      error: {
        code: "network",
        message: "Не удалось загрузить список",
      },
    };
  }

  return {
    ok: true,
    data: menuItems,
  };
}

export async function updateMenuItem(
  payload: StockUpdatePayload,
): Promise<ApiResult<MenuItem>> {
  await delay(MOCK_DELAY);

  if (shouldFail()) {
    return {
      ok: false,
      error: {
        code: "network",
        message: "Не удалось сохранить изменения",
      },
    };
  }

  const itemIndex = menuItems.findIndex((item) => item.id === payload.id);

  if (itemIndex === -1) {
    return {
      ok: false,
      error: {
        code: "unknown",
        message: "Позиция не найдена",
      },
    };
  }

  const updatedItem: MenuItem = {
    ...menuItems[itemIndex],
    stock: payload.stock,
  };

  menuItems[itemIndex] = updatedItem;

  return {
    ok: true,
    data: updatedItem,
  };
}
