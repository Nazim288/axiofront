import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imageUrl = searchParams.get("url");

  if (!imageUrl) {
    return NextResponse.json(
      { error: "URL изображения не предоставлен" },
      { status: 400 }
    );
  }

  try {
    // Проксируем запрос к Yandex Disk через сервер (нет CORS ограничений)
    const response = await fetch(imageUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Не удалось загрузить изображение" },
        { status: response.status }
      );
    }

    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    // Возвращаем изображение с правильными заголовками
    return new NextResponse(arrayBuffer, {
      headers: {
        "Content-Type": blob.type || "image/png",
        "Content-Disposition": `attachment; filename="image.png"`,
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Ошибка при проксировании изображения:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
