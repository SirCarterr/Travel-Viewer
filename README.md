# TravelViewer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.1.0.

The project uses such extrenal services:
- https://v6.db.transport.rest/#v6dbtransportrest-documentation
- https://developers.google.com/maps/documentation/javascript
 
## About:
Project allows to view the train/bus travels accross German. You can either view the journey from point A to B or view what arrives/depatures from chosen station. 
Also, you can select specific filters on searching travels (e.g. search national express train that will scheduled in next 3 days). The routes of results could be shown 
on google map where you can see where and how the train goes.

## Development server

1) Go to 'index.html' to line 15 and in <script> section enter your APi key (you can get it here: https://developers.google.com/maps/documentation/javascript/get-api-key).
2) Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
