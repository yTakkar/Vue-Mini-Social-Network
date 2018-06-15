email<template>
  <div>
    <div id='publishContainer' class='aligner publish'>
      <h2 style='padding: 5px;' class='title'>
        Publish your own ads on SpeakEasy!
      </h2>

      <div class='form'>
        <ui-textbox
        autocomplete="off"
        class="publishfield "
        error="This field is required"
        label="Name"
        placeholder="Enter your name"
        required
        :invalid="nameTouched && name.length === 0"
        @touch="nameTouched= true"

        v-model="name"
        >
      </ui-textbox>

        <ui-textbox
        autocomplete="off"
        class="publishfield "
        error="This field is required"
        label="Company"
        placeholder="Company Name"
        required
        :invalid="companyTouched && company.length === 0"
        @touch="companyTouched= true"

        v-model="company"
        >
      </ui-textbox>

        <ui-textbox
        autocomplete="off"
        class="publishfield "
        error="This field is required"
        label="Phone"
        placeholder="Enter your phone number"
        :invalid="phoneTouched && phone.length === 0"
        @touch="phoneTouched= true"

        v-model="phone"
        >
      </ui-textbox>

      <ui-textbox
      autocomplete="off"
      error="This field is required"
      class="publishfield "
      label="Email"
      placeholder="Enter your email id"
      required
      :invalid="emailTouched && email.length === 0"
      @touch="emailTouched = true"

      v-model="email"
      >
    </ui-textbox>

    <ui-textbox
    floating-label
    help="Maximum 256 characters"
    label="Short description"
    placeholder="Describe your product"

    :multi-line="true"
    :maxlength="256"

    required
    :invalid="descTouched && desc.length === 0"
    @touch="descTouched = true"

    v-model="desc"
    >

    </ui-textbox>

    <ui-fileupload style="margin-bottom: 20px;" multiple name="file10"></ui-fileupload>
    <br/>
    <ui-button color="green" raised :size="size" v-on:click="createPost">Submit Ad Request</ui-button>

  </div>

</div>


</div>

</template>

<script>
import Notify from 'handy-notification'
import $ from 'jquery'

export default {
    data() {
        return {
            name: '',
            nameTouched: false,
            email: '',
            emailTouched: false,
            phone: '',
            phoneTouched: false,
            desc: '',
            descTouched: false,
            company: '',
            companyTouched: false
        };
    },
    methods: {
      createPost: async function() {
        console.log (this);
        let
          {
            name,
            company,
            email,
            phone,
            desc,
            $http
          } = this,

          { body } = await $http.post('/api/submitAdRequest', {
            name: name,
            company: company,
            phone: phone,
            email: email,
            desc: desc
          })

        Notify({
          value: 'Ad Request Submitted!',
        })
      }
    }
}
</script>

<style>
  .publish {
      position: relative;
    margin-top: 150px;
    border-radius: 10px;
    background: #fff;
    padding: 20px;
  }

  .form {
    padding: 10px;
    padding-right: 60px;
    font-size: 80%;
  }

  .publishfield {
    padding: 10px;
  }
</style>
