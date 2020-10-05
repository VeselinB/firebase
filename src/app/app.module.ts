import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { MaterialModule } from './material/material.module';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { LoginComponent } from './users/components/login/login.component';
import { RegisterComponent } from './users/components/register/register.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment.prod';
import { NavigationComponent } from './navigation/navigation.component';
import { EditDataComponent } from './users/components/edit-data/edit-data.component';
import { ToolbarMediaComponent } from './navigation/toolbar-media/toolbar-media.component';
import { ToolbarNoMediaComponent } from './navigation/toolbar-no-media/toolbar-no-media.component'
@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    EditDataComponent,
    ToolbarMediaComponent,
    ToolbarNoMediaComponent,

  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCexHG5OE-F4R3XwLceoCjXPy6Mfz7rz4A",
      authDomain: "fir-22872.firebaseapp.com",
      databaseURL: "https://fir-22872.firebaseio.com",
      projectId: "fir-22872",
      storageBucket: "fir-22872.appspot.com",
      messagingSenderId: "48511615694",
      appId: "1:48511615694:web:071c32968f0ac74879869f"
    }),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    StoreModule.forRoot([]),
    EffectsModule.forRoot([]),

    StoreDevtoolsModule.instrument({
      name: 'FirebaseDemo',
      logOnly: environment.production
    })
  ],
  entryComponents: [EditDataComponent],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
