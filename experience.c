#include <emscripten.h>

static int level = 0;
static int experience = 0;
static double max_experience = 10.0;

EMSCRIPTEN_KEEPALIVE void click(void) {
    if (experience < max_experience) {
        experience++;
    }
}

EMSCRIPTEN_KEEPALIVE int get_exp(void) {
    return experience;
}

EMSCRIPTEN_KEEPALIVE int get_level(void) {
    return level;
}

EMSCRIPTEN_KEEPALIVE int get_max_exp(void) {
    return (int)max_experience;
}

EMSCRIPTEN_KEEPALIVE void upgrade(void) {
    if (experience >= max_experience) {
        level++;
        experience = 0;
        max_experience *= 1.2;
    }
}

// 상점 구매 시 경험치 차감 (cost만 전달받음)
EMSCRIPTEN_KEEPALIVE int shop_buy(int cost) {
    if (experience >= cost) {
        experience -= cost;
        return 1; // 구매 성공
    }
    return 0; // 구매 실패
}

// 룰렛 보상으로 경험치 증가 (gain만 전달받음)
EMSCRIPTEN_KEEPALIVE void roulette_gain(int gain) {
    experience += gain;
    if (experience > max_experience) {
        experience = (int)max_experience;
    }
}

