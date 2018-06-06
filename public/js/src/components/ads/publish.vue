<template>
  <div>
    Publish your own ads on SpeakEasy!
  </div>

  <ui-textbox
                 autocomplete="off"
                 error="This field is required"
                 label="Name"
                 placeholder="Enter your name"
                 required
                 :invalid="textbox10Touched && textbox10.length === 0"
                 @touch="textbox10Touched = true"

                 v-model="textbox10"
             >
  </ui-textbox>

  <ui-textbox
               icon="phone"
               label="Phone number"
               placeholder="Enter your phone number"
               type="tel"
               v-model="textbox7"
           ></ui-textbox>
  <ui-textbox
                 autocomplete="off"
                 error="This field is required"
                 label="Email"
                 placeholder="Enter your email id"
                 required
                 :invalid="textbox10Touched && textbox10.length === 0"
                 @touch="textbox10Touched = true"

                 v-model="textbox10"
             >
  </ui-textbox>
  <ui-textbox
               enforce-maxlength
               floating-label
               help="Maximum 256 characters"
               label="Short description"
               placeholder="Describe your product"

               :multi-line="true"
               :maxlength="256"

               required
               :invalid="textbox10Touched && textbox10.length === 0"
               @touch="textbox10Touched = true"

               v-model="textbox14"
           >

  </ui-textbox>

</template>
