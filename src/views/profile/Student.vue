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
            <form>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputEmail4">Email</label>
                  <input type="email" class="form-control" id="inputEmail4" placeholder="Email">
                </div>
                <div class="form-group col-md-6">
                  <label for="inputPassword4">Password</label>
                  <input type="password" class="form-control" id="inputPassword4" placeholder="Password">
                </div>
              </div>
              <div class="form-group">
                <label for="inputAddress">Address</label>
                <input type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
              </div>
              <div class="form-group">
                <label for="inputAddress2">Address 2</label>
                <input type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
              </div>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="inputCity">City</label>
                  <input type="text" class="form-control" id="inputCity">
                </div>
                <div class="form-group col-md-4">
                  <label for="inputState">State</label>
                  <select id="inputState" class="form-control">
                    <option selected="">Choose...</option>
                    <option>...</option>
                  </select>
                </div>
                <div class="form-group col-md-2">
                  <label for="inputZip">Zip</label>
                  <input type="text" class="form-control" id="inputZip">
                </div>
              </div>
              <div class="form-group">
                <label class="custom-control custom-checkbox m-0">
                  <input type="checkbox" class="custom-control-input">
                  <span class="custom-control-label">Check me out</span>
                </label>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-lg-5 col-xxl-6 d-flex">
        <div class="card flex-fill">
          <div class="card-header">
            <h5 class="card-title">Select2</h5>
            <h6 class="card-subtitle text-muted">The jQuery replacement for select boxes.</h6>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <div class="position-relative"><select class="form-control select2 select2-hidden-accessible" data-toggle="select2" data-select2-id="1" tabindex="-1" aria-hidden="true">
                <optgroup label="Alaskan/Hawaiian Time Zone">
                  <option value="AK" data-select2-id="3">Alaska</option>
                  <option value="HI">Hawaii</option>
                </optgroup>
                <optgroup label="Pacific Time Zone">
                  <option value="CA">California</option>
                  <option value="NV">Nevada</option>
                  <option value="OR">Oregon</option>
                  <option value="WA">Washington</option>
                </optgroup>
                <optgroup label="Mountain Time Zone">
                  <option value="AZ">Arizona</option>
                  <option value="CO">Colorado</option>
                  <option value="ID">Idaho</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NM">New Mexico</option>
                  <option value="ND">North Dakota</option>
                  <option value="UT">Utah</option>
                  <option value="WY">Wyoming</option>
                </optgroup>
                <optgroup label="Central Time Zone">
                  <option value="AL">Alabama</option>
                  <option value="AR">Arkansas</option>
                  <option value="IL">Illinois</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="OK">Oklahoma</option>
                  <option value="SD">South Dakota</option>
                  <option value="TX">Texas</option>
                  <option value="TN">Tennessee</option>
                  <option value="WI">Wisconsin</option>
                </optgroup>
                <optgroup label="Eastern Time Zone">
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="IN">Indiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="OH">Ohio</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WV">West Virginia</option>
                </optgroup>
              </select><span class="select2 select2-container select2-container--bootstrap4" dir="ltr" data-select2-id="2" style="width: 132px;"><span class="selection"><span class="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-disabled="false" aria-labelledby="select2-y5hq-container"><span class="select2-selection__rendered" id="select2-y5hq-container" role="textbox" aria-readonly="true" title="Alaska">Alaska</span><span class="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span></div>
            </div>

            <div class="mb-3">
              <div class="position-relative"><select class="form-control select2 select2-hidden-accessible" data-toggle="select2" multiple="" data-select2-id="4" tabindex="-1" aria-hidden="true">
                <optgroup label="Alaskan/Hawaiian Time Zone">
                  <option value="AK">Alaska</option>
                  <option value="HI">Hawaii</option>
                </optgroup>
                <optgroup label="Pacific Time Zone">
                  <option value="CA">California</option>
                  <option value="NV">Nevada</option>
                  <option value="OR">Oregon</option>
                  <option value="WA">Washington</option>
                </optgroup>
                <optgroup label="Mountain Time Zone">
                  <option value="AZ">Arizona</option>
                  <option value="CO">Colorado</option>
                  <option value="ID">Idaho</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NM">New Mexico</option>
                  <option value="ND">North Dakota</option>
                  <option value="UT">Utah</option>
                  <option value="WY">Wyoming</option>
                </optgroup>
                <optgroup label="Central Time Zone">
                  <option value="AL">Alabama</option>
                  <option value="AR">Arkansas</option>
                  <option value="IL">Illinois</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="OK">Oklahoma</option>
                  <option value="SD">South Dakota</option>
                  <option value="TX">Texas</option>
                  <option value="TN">Tennessee</option>
                  <option value="WI">Wisconsin</option>
                </optgroup>
                <optgroup label="Eastern Time Zone">
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="IN">Indiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="OH">Ohio</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WV">West Virginia</option>
                </optgroup>
              </select><span class="select2 select2-container select2-container--bootstrap4" dir="ltr" data-select2-id="5" style="width: 203.734px;"><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-disabled="false"><ul class="select2-selection__rendered"><li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" placeholder="Select value" style="width: 1556px;"></li></ul></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span></div>
            </div>

            <div>
              <div class="position-relative"><select class="form-control select2 select2-hidden-accessible" data-toggle="select2" multiple="" data-select2-id="6" tabindex="-1" aria-hidden="true">
                <option value="one">First</option>
                <option value="two" disabled="disabled">Second (disabled)</option>
                <option value="three">Third</option>
              </select><span class="select2 select2-container select2-container--bootstrap4" dir="ltr" data-select2-id="7" style="width: 128.453px;"><span class="selection"><span class="select2-selection select2-selection--multiple" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="-1" aria-disabled="false"><ul class="select2-selection__rendered"><li class="select2-search select2-search--inline"><input class="select2-search__field" type="search" tabindex="0" autocomplete="off" autocorrect="off" autocapitalize="none" spellcheck="false" role="searchbox" aria-autocomplete="list" placeholder="Select value" style="width: 1556px;"></li></ul></span></span><span class="dropdown-wrapper" aria-hidden="true"></span></span></div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 col-lg-7 col-xxl-6 d-flex">
        <div class="card flex-fill">
          <div class="card-header">
            <h5 class="card-title">Date Range Picker</h5>
            <h6 class="card-subtitle text-muted">Component for choosing date ranges, dates and times.</h6>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-12 col-xl-4">
                <div class="form-group">
                  <label class="form-label">Date Range</label>
                  <input class="form-control" type="text" name="daterange" value="01/01/2018 - 01/15/2018">
                </div>
              </div>

              <div class="col-12 col-xl-8">
                <div class="form-group">
                  <label class="form-label">Date Range with Times</label>
                  <input class="form-control" type="text" name="datetimes">
                </div>
              </div>

              <div class="col-12 col-xl-4">
                <div class="form-group mb-xl-0">
                  <label class="form-label">Single Date Picker</label>
                  <input class="form-control" type="text" name="datesingle">
                </div>
              </div>

              <div class="col-12 col-xl-8">
                <div class="form-group mb-xl-0">
                  <label class="form-label">Predefined Date Ranges</label>
                  <div id="reportrange" class="overflow-hidden form-control">
                    <i class="far fa-calendar"></i>&nbsp;
                    <span>November 27, 2020 - December 26, 2020</span> <i class="fas fa-caret-down"></i>
                  </div>
                </div>
              </div>
            </div>
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

</style>