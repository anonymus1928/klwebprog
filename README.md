
**~~Open sandbox: https://codesandbox.io/s/bajusz-stratego-cy35l~~**

A webprogramozás domain http protokollon keresztül fut, a böngésző letiltja ha https-en keresztül akarom elérni. Ezért a codesandboxon nem működik a websocket.

**Működő deploy: http://bajusz.taboriposta.hu**

_A fenti okból mindenképpen http protokoll szükséges!!!_

Az előkészítő szobánál a már felrakott bábukat jobb egérgombbal le lehet szedni. Ez a funkció már a második felvonásban is benne volt.

```javascript
// src/views/Game/GameBoard.js
const rightClickHandler = (i,j,tile,e) => {
    e.preventDefault()
    if(gameState === PREPARE_GAME && !ready.player) {
        dispatch(removeTile(i,j))
        dispatch(tilesIncreasePcs(tile))
        dispatch(wsSyncState())
    }
}
```

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

#

**Németh Tamás Zoltán**  
**LX12AG**  
Kliensoldali webprogramozás | Stratego  
*2020. 05. 24.*  

Ezt a megoldást **Németh Tamás Zoltán** küldte be és készítette a *Kliensoldali webprogramozás* kurzus *Stratego* feladatához.  
Kijelentem, hogy ez a megoldás a saját munkám.  
Nem másoltam vagy használtam harmadik féltől származó megoldásokat.  
Nem továbbítottam megoldást hallgatótársaimnak, és nem is tettem közzé.  
Az Eötvös Loránd Tudományegyetem Hallgatói Követelményrendszere (ELTE szervezeti és működési szabályzata, II. Kötet, 74/C. §) kimondja, 
hogy mindaddig, amíg egy hallgató egy másik hallgató munkáját - vagy legalábbis annak jelentős részét - saját munkájaként mutatja be, 
az fegyelmi vétségnek számít. A fegyelmi vétség legsúlyosabb következménye a hallgató elbocsátása az egyetemről.
