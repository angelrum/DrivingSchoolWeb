<template>
  <div>
    <div class="header">
      <h1 class="header-title">
        Добрый день, Иван!
      </h1>
      <p class="header-subtitle">У вас есть необработанные сообщения.</p>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">Профиль пользователя</h5>
            <h6 class="card-subtitle text-muted">Профиль текущего пользователя.</h6>
          </div>
          <div class="card-body">
            <v-form>
              <v-row>
                <v-col class="col-3">
                  <v-img
                      src="https://img.icons8.com/bubbles/100/000000/elvis-presley.png"
                      max-height="100"
                      max-width="100"
                      class="m-auto"
                  ></v-img>
                </v-col>
                <v-col>
                  <v-row>
                    <v-col>
                      <v-text-field
                          :counter="10"
                          label="Фамилия"
                          required>
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                          :counter="10"
                          label="Фамилия"
                          required>
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                          :counter="10"
                          label="Фамилия"
                          required>
                      </v-text-field>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-text-field
                          :counter="10"
                          label="Фамилия"
                          required>
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                          :counter="10"
                          label="Фамилия"
                          required>
                      </v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                          :counter="10"
                          label="Фамилия"
                          required>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <div class="input-group mb-3">
                    <div class="input-group-prepend v-text-field pb-21">
                      <span class="input-group-text">$</span>
                    </div>
                    <v-text-field
                        label="Имя"
                        required>
                    </v-text-field>
                  </div>
                </v-col>
                <v-col>
                  <v-text-field
                      :counter="10"
                      label="Имя"
                      required>
                  </v-text-field>
                </v-col>
                <v-col>
                  <v-text-field
                      :counter="10"
                      label="Отчество"
                      required>
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "Student"
}
</script>

<style scoped>
.pb-21 {
  padding-bottom: 21px;
}
</style>