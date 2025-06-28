#include <emscripten.h>
#include <stdio.h>

static int intelligence = 0;

EMSCRIPTEN_KEEPALIVE void click(void) {
    intelligence++;
}

EMSCRIPTEN_KEEPALIVE int get_intelligence(void) {
    return intelligence;
}

EMSCRIPTEN_KEEPALIVE int buy_item(int cost) {
    if (intelligence >= cost) {
        intelligence -= cost;
        return 1; // 구매 성공
    }
    return 0; // 구매 실패 (지능 부족)
}

