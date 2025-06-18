#include <emscripten.h>
#include <stdio.h>

static int intelligence = 0;

EMSCRIPTEN_KEEPALIVE void click(void) {
    intelligence++;
}

EMSCRIPTEN_KEEPALIVE int get_intelligence(void) {
    return intelligence;
}

