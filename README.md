# A demo, helps you to fix the special spatial transform into the `GCJ02` CRS

## How to use

I recommend you manage the project's dependencies by using the `Yarn` tool.

```bash
yarn
yarn start

-------------------

Compiled successfully!

You can now view map-on-react in the browser.
  Local:            http://localhost:3000

Note that the development build is not optimized.
To create a production build, use yarn build.

webpack compiled successfully

```

As you see on your browser page, there are three maps horizontal. From left to right, the first one is OpenStreetMap, which is well known with the coordinate reference system or the CRS, named the `WGS84`. And the rest maps are GaoDeMap, which is a famous Chinese map provider with the CRS `GCJ02`.

I select a position located at Hong Kong Airport from the OpenStreetMap, and the coordinates are `[22.31292, 113.92715]`, just inside the West Hall of the Airport. Now you should notice the second map, the central one, rendering the mislocated point with some offsets.

Sometimes, we could transform the point from `WGS84` to `GCJ02` and put it on the GaoDeMap exactly indeed. Or, do you really want to do this when you confront a lot of points, polylines or polygons? It will hurt the experience while you do lots of data transforms on your page. Therefore, I suggest you do this before the data is fetched to the Front-end.

The most recommended way is to do like this demo. Focus on the third map, the right one, and you would find the point is in the right position. Aha, the right map shows the right position. Finally, you could get what I have done on my codes, and I hope it will help you to deal with this issue. Clone the repository and put your hands dirty. If there are any issues, please contact me! Thanks a lot.

![image](./readme/transform_demo.png)

## References

> - Leaflet is the leading open-source JavaScript library for mobile-friendly interactive maps.
>   - https://leafletjs.com/
> - coordtransform
>   - https://www.npmjs.com/package/coordtransform

## Furthermore

You could try your layers this way, and if you have any questions. It would be regardful for me to recieve your comments.
