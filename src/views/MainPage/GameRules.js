import React from 'react';

export function GameRules() {
    return (
        <div id="gamerules">
            <div className="container py-5 mx-auto">
                <h1>Játékszabály</h1>
                <hr />
                <h2>A játék célja</h2>
                <p>A játékban két játékos játszik egymással egy-egy hadsereg élén. Cél az ellenfél zászlójának megszerzése. A tábla 10x10 cellából áll. Eredetileg mindkét félnek 40 bábuja van: 1 zászló, 5 bomba, és katonák 1-től 10-es erővel. Egymás bábuit azonban nem látják, csak akkor, amikor két bábu csatázni kezd. Ekkor az erősebb bábu marad a pályán, a gyengébbik leesik a tábláról. Ha két azonos bábu harcol egymással, akkor mindkettő lekerül a tábláról. Minden bábu csak 1-et léphet előre, hátra, jobbra, balra. a zászló és az akna értelemszerűen nem tud lépni. A táblán lehetnek olyan mezők, amelyre nem lehet lépni (tó).</p>
                
                <h2>Egységek</h2>
                <ul>
                    <li>Zászló (1x)</li>
                    <li>Tábornagy (10-es szint, 1x)</li>
                    <li>Tábornok (9-es szint, 1x)</li>
                    <li>Ezredes (8-es szint, 2x)</li>
                    <li>Őrnagy (7-es szint, 3x)</li>
                    <li>Kapitány (6-es szint, 4x)</li>
                    <li>Főhadnagy (5-es szint, 4x)</li>
                    <li>Őrmester (4-es szint, 4x)</li>
                    <li>Aknász (3-es szint, 5x)</li>
                    <li>Felderítő (2-es szint, 8x)</li>
                    <li>Kém (1-es szint, 1x)</li>
                    <li>Bomba (6x)</li>
                </ul>

                <h2>Különleges egységek</h2>
                <dl>
                    <dt>Felderítő (2-es szint)</dt>
                    <dd>Akárhány mezőt átugorva léphet vagy támadhat. Tavat ő sem tudja átugrani.</dd>
                    <dt>Aknász (3-as szint)</dt>
                    <dd>Csak ő tudja hatástalanítani a bombát.</dd>
                    <dt>Kém (1-es szint)</dt>
                    <dd>Csak ő képes megölni az ellenség Tábornagyát (10-es szint).</dd>
                    <dt>Bomba</dt>
                    <dd>A játék folyamán nem mozdítható el. Bárki (az Aknászt (3-as szint) leszámítva) ha rálép meghal és a Bomba a helyén marad. Csak az Aknász (3-as szint) képes hatástalanítani.</dd>
                    <dt>Zászló</dt>
                    <dd>A játék folyamán nem mozdítható el. Bármelyik figura megszerezheti. Ha ez sikerül, a játék végetér és aki megszerezte az ellenfél zászlaját nyer.</dd>
                </dl>
                
                <h2>A játék menete</h2>
                <p>A játékot a piros játékos kezdi. A játék további menetében a játékosok felváltva lépnek. A soron levőjátékosnak lépnie kell egyet egy saját figurájával. A játékos figurájával egy üres mezőre léphet, vagy egy olyan mezőre, amin az ellenfél egyik figurája áll. Ezt nevezzük támadásnak. Az éppen soron lévő játékos mindig csak egy figurával léphet. Nem léphet olyan mezőre és nem ugorhat át olyan mezőt, amelyiken egy saját figurája áll!</p>
                <h2>Lépés a saját figurával</h2>
                <p>A saját figurával egy mezőt lehet lépni tetszőleges irányba: jobbra, balra, előre, hátra.</p>
                <p>Kivétel azonban ez alól a szabály alól a Felderítő (2-es szint)!</p>
                <p>A játékos egy figurával sem léphet átlós irányba, és nem ugorhat át másik figurát.</p>
                <p>Minden mezőn csak egy figura állhat.</p>
                <p>A játéktábla közepén lévő tavak mezőire lépni, illetve a tavakat átugrani nem lehet!</p>
            </div>
        </div>
    )
}