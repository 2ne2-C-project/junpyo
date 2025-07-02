#include <emscripten.h>

static int level = 27;
static int experience = 134;
static int max_experience = 230;

static const char* shop_items[] = {
    "Celestial Saber", "Voidbreaker Shield", "Ethereal Staff", "Dragonfire Bow",
    "Phantom Dagger", "Stormcaller Hammer", "Frostbite Blade", "Solar Flare Armor",
    "Lunar Mantle", "Netherwing Boots", "Arcane Crystal", "Divine Ring",
    "Mystic Amulet", "Shadowfang Cloak", "Thunderstrike Gauntlets", "Inferno Helm",
    "Glacial Greaves", "Spectral Cape", "Runebound Necklace", "Tempest Orb"
};

static const char* roulette_rewards[] = {
    "XP +150", "XP +300", "Legendary Sword", "Epic Shield", "Mythic Armor",
    "Rare Pet", "Bonus Gold 1000", "Extra Life", "Speed Boost", "Double XP",
    "Magic Scroll", "Teleport Stone", "Invisibility Cloak", "Fireball Spell",
    "Ice Lance", "Thunder Hammer", "Windblade", "Earthshaker", "Water Ring",
    "Lightbringer Helm"
};

EMSCRIPTEN_KEEPALIVE int get_shop_item_count(void) {
    return sizeof(shop_items) / sizeof(shop_items[0]);
}

EMSCRIPTEN_KEEPALIVE int get_roulette_reward_count(void) {
    return sizeof(roulette_rewards) / sizeof(roulette_rewards[0]);
}

EMSCRIPTEN_KEEPALIVE int get_exp(void) {
    return experience;
}

EMSCRIPTEN_KEEPALIVE int get_level(void) {
    return level;
}

EMSCRIPTEN_KEEPALIVE int get_max_exp(void) {
    return max_experience;
}

EMSCRIPTEN_KEEPALIVE const char* get_shop_item_name(int idx) {
    int count = get_shop_item_count();
    if (idx < 0 || idx >= count) return "Invalid Item";
    return shop_items[idx];
}

EMSCRIPTEN_KEEPALIVE const char* get_roulette_reward_name(int idx) {
    int count = get_roulette_reward_count();
    if (idx < 0 || idx >= count) return "Invalid Reward";
    return roulette_rewards[idx];
}

EMSCRIPTEN_KEEPALIVE void add_exp(int amt) {
    experience += amt;
    if (experience > max_experience) experience = max_experience;
}

EMSCRIPTEN_KEEPALIVE int spend_exp(int cost) {
    if (experience >= cost) {
        experience -= cost;
        return 1;
    }
    return 0;
}

EMSCRIPTEN_KEEPALIVE void level_up(void) {
    level++;
    experience = 0;
    max_experience = (int)(max_experience * 1.2);
}
