<template>
  <div class="goal-container">
    <h2>
      {{ username }}님과 비슷한 상황과 목표를 가진 사람들은<br />어떤 상품을
      선택했을까요?
    </h2>
    <h4>상품 정보를 확인 하기 위해 다음 항목을 입력해주세요.</h4>
    <Form>
      <div class="personal-info">
        <div class="age mb-2">
          <CustomInputNumber
            :inputid="'age'"
            :inputnumber="age"
            :inputplaceholder="'나이'"
          />
        </div>
        <div class="job mb-2">
          <Select
            v-model="selectedJob"
            :options="job"
            placeholder="재직 여부"
            fluid=""
          ></Select>
        </div>
        <div class="finanacial-status  mb-2">
          <Select
            v-model="selectedFinancialStatus"
            :options="moneyRange"
            placeholder="자산 현황"
            fluid=""
          ></Select>
        </div>
        <div class="goal mb-2">
          <Select
            v-model="selectedGoal"
            :options="goal"
            placeholder="목표"
            fluid=""
          ></Select>
        </div>
        <div class="salary mb-2">
          <Select
            v-model="selectedSalary"
            :options="moneyRange"
            placeholder="급여"
            fluid=""
          ></Select>
        </div>
      </div>
      <CustomButton
        labelname="상품 확인 하기"
        type="submit"
        justify="end"
      ></CustomButton>
    </Form>
  </div>
</template>

<script setup>
import CustomInputNumber from "@/components/input/CustomInputNumber.vue";
import Select from "primevue/select";
import CustomButton from "@/components/button/CustomButton.vue";
import { Form } from "@primevue/forms";
import { ref } from "vue";

const username = ref("000");

const age = ref("");
const moneyRange = ref(["0이상 100미만", "100이상 200미만"]);
const job = ref(["직업 1", "직업 2"]);
const goal = ref(["목표 1", "목표2"]);

const selectedJob = ref("");
const selectedFinancialStatus = ref("");
const selectedGoal = ref("");
const selectedSalary = ref("");
</script>

<style scoped>
.goal-container {
  width: 60%;
}

.mb-2 {
  margin-bottom: 1rem;
}
.personal-info {
  margin-bottom: 2rem;
}

.btn-container {
  display: flex;
  justify-content: flex-end;
}
</style>
