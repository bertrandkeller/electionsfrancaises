To do
Parser JSON : https://lemire.me/blog/2020/03/31/we-released-simdjson-0-3-the-fastest-json-parser-in-the-world-is-even-better/

<https://www.generations-futures.fr/cartes/pourcentage-danalyses-quantifiees-pour-le-glyphosate-2015/>
<https://geo.data.gouv.fr/fr/datasets/1d6924486d4c96d9e7b32bcc16816d7ddc0cc2b8>
<https://github.com/gregoiredavid/france-geojson>
<http://thecodebarbarian.com/a-practical-introduction-to-geojson-with-node-js.html>

<https://getudata.org/>
<https://dataanalyticspost.com/>

<https://www.francetvinfo.fr/monde/environnement/barrage-de-sivens/on-veut-qu-il-y-ait-une-vie-dans-cette-riviere-a-sivens-la-secheresse-ravive-le-conflit-entre-pro-et-anti-barrage_3560711.html>
<https://www.generations-futures.fr/cartes/>

[https://www.data.gouv.fr/fr/datasets/donnees-temps-reel-de-mesure-des-concentrations-de-polluants-atmospheriques-reglementes-1/#\_](https://www.data.gouv.fr/fr/datasets/donnees-temps-reel-de-mesure-des-concentrations-de-polluants-atmospheriques-reglementes-1/#_)
[https://www.data.gouv.fr/fr/datasets/indicateurs-consommation-espace-2019-issus-des-fichiers-fonciers-pnb-action7/#\_](https://www.data.gouv.fr/fr/datasets/indicateurs-consommation-espace-2019-issus-des-fichiers-fonciers-pnb-action7/#_)

## Données

<http://infoterre.brgm.fr/>
<https://www.statistiques.developpement-durable.gouv.fr/>
<https://cget-carto.github.io/le-grand-debat-national/>
<https://cartotheque.cget.gouv.fr/cartes>
<https://reseau-eau.educagri.fr/?RessourCes>
<https://ec.europa.eu/eurostat/fr/web/agriculture/data/database>
<https://geodatamine.fr/>
<https://toolbox.google.com/datasetsearch>

### Emplois publics

<https://www.strategie.gouv.fr/publications/repartition-territoriale-emplois-publics>

### Pollution sols

<https://basol.developpement-durable.gouv.fr/recherche.php#http://www.arcgis.com/apps/Embed/index.html?webmap=a58f278fddef4be58a227420918c9426&extent=-13.1309,40.3348,19.3227,53.0452&zoom=true&scale=false&search=true&searchextent=true&theme=light>
<https://www.karugeo.fr/accueil>

### Pesticides

<https://koumoul.com/en/datasets/vente-de-pesticides>
<http://www.chroniques-cartographiques.fr/2017/10/carte-stations-pesticides.html>
<http://www.chroniques-cartographiques.fr/2017/07/puberte-precoce-la-carte-de-france-des-perturbateurs-endocriniens.html>
<https://www.data-pesticides.fr/>
<https://www.villes-et-villages-sans-pesticides.fr/>

### Air

<https://www.data.gouv.fr/fr/datasets/mise-a-disposition-de-donnees-de-qualite-de-lair-sur-la-france-www-prevair-org-1/>

### Eau

<http://www.data.eaufrance.fr/>
<https://ades.eaufrance.fr/>
<https://solidarites-sante.gouv.fr/sante-et-environnement/eaux/eau>
<https://sierm.eaurmc.fr/l-eau-pres-de-chez-vous/eau-bourg-en-bresse-01053.php>
<http://www.meteo-paris.com/actualites/niveau-des-cours-d-eau-tres-bas-par-manque-de-pluie-23-fevrier-2017.html>
<http://propluvia.developpement-durable.gouv.fr/propluvia/faces/public/carteDep.jsp>
<http://www.services.eaufrance.fr/panorama/cartes/2011/eau-potable>
<https://www.sauvonsleau.fr/jcms/e_22059/cet-ete-profitez-des-plus-belles-rivieres-de-france-#.XXdW6mQzYWp>
<https://www.eaurmc.fr/upload/docs/application/pdf/2019-09/guide_riviere_en_tresses_v27_complet.pdf>

csvtojson csv/commune.csv > data/commune.json
geojson-polygon-labels --precision=0.001 --include-area --label=polylabel --by-feature --include-minzoom=0-16 --verbose data/communesgeojson.json > data/labels.geojson
csvtojson substancerhone2017.csv > data/substancerhone2017.json
csvtojson csv/substancebourgogne2017.csv > data/substancebourgogne2017.json
csvtojson csv/municipales-2020.csv > data/municipales-2020.json

Regex postal code - Ajout un zéro devant les codes à 4 chiffres
,(\\w[0-9]{3}),  => ,0$1,
^(\d{4}), => ,0$1, line start with for digit
([A-Z]{1}[A-Z]{1})\d{3}

<https://www.mediapart.fr/journal/france/040719/commune-par-commune-la-carte-de-france-des-pesticides?onglet=full>
<https://webkid.io/blog/fancy-map-effects-with-css/>

Formules
RECHERCHEV($D2;lat::Tableau 1::$A$2:$B$50000;2;FAUX)


{{- $communes := $.Site.Data.regionales2021 -}}
{{- $departement := slice "01" -}}
{{- range $index, $r := $communes -}}
{{- $.Scratch.SetInMap (printf "%s-%s" .commune .Code) (printf "%s" .codenuance) .voix -}}
{{- $.Scratch.SetInMap (printf "%s-%s" .commune .Code) "commune" .commune -}}
{{- $.Scratch.SetInMap (printf "%s-%s" .commune .Code) "abstentions" .abstentions -}}
{{- $.Scratch.SetInMap (printf "%s-%s" .commune .Code) "votants" .votants -}}
{{- $.Scratch.SetInMap (printf "%s-%s" .commune .Code) "blancs" .blancs -}}
{{- $.Scratch.SetInMap (printf "%s-%s" .commune .Code) "codecommune" .codecommune -}}
{{- $.Scratch.SetInMap (printf "%s-%s" .commune .Code) "Code" .Code -}}
{{- $.Scratch.SetInMap (printf "%s-%s" .commune .Code) "inscrits" .inscrits -}}
{{- $.Scratch.Set "Total" (cond (not (index ($.Scratch.Get (printf "%s-%s" .commune .Code)) "Total")) 0 (index ($.Scratch.Get (printf "%s-%s" .commune .Code)) "Total")) -}}
{{- if or (eq .codenuance "LECO") (eq .codenuance "LFI") (eq .codenuance "LUG") (eq .codenuance "LUGE") (eq .codenuance "LDVG") (eq .codenuance "LSOC") }}
{{- $.Scratch.SetInMap (printf "%s-%s" .commune .Code) "Total" ((add ($.Scratch.Get "Total") (float .voix))) -}}
{{- end -}}
{{- $.Scratch.SetInMap "result" (printf "%s" .commune) ($.Scratch.Get (printf "%s-%s" .commune .Code)) -}}
{{- end -}}
[
{{- range ($.Scratch.Get "result") -}}
{{ . | jsonify }},
{{- end -}}
]

