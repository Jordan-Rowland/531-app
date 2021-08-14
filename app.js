document.addEventListener("alpine:init", () => {
  Alpine.data("workoutBuilder", () => ({
    tm: null,
    roundTo: 2.5,
    jokers: false,
    threeFiveOne: false,
    fivePros: false,
    barWeight: 45,
    workouts: [],

    init() {
      this.getLocalStorageFields();
      this.generateMainWork();
    },

    generateMainWork() {
      workouts = [
        {
          id: 1,
          percentages: [.4, .5, .6],
          reps: [5, 5, 3],
        },
        {
          id: 2,
          percentages: [.65, .75, .85, .95, 1.05],
          reps: [5, 5, "5+", "1-3", "1-3"],
        },
        {
          id: 3,
          percentages: [.7, .8, .9, 1, 1.10],
          reps: [3, 3, "3+", "1-3", "1-3"],
        },
        {
          id: 4,
          percentages: [.75, .85, .95, 1.05, 1.15],
          reps: [5, 3, "1+", "1-3", "1-3"],
        },
      ];
      if (this.threeFiveOne) {
        let warmup = workouts.shift();
        let five = workouts.shift();
        let three = workouts.shift();
        five.percentages = [.65, .75, .85];
        five.reps = [5, 5, 5];
        workouts = [warmup, three, five, ...workouts];
      }
      if (this.fivePros) {
        workouts = workouts.map((item) => {
          item.percentages = item.percentages.slice(0, 3);
          item.reps = [5, 5, 5];
          return item;
        });
      }
      if (this.fivePros && this.jokers) {
        this.jokers = false;
      }
      this.workouts = workouts;
      this.checkAndSetLocalStorageTM();
    },

    roundToWeight(weight, roundTo = parseFloat(this.roundTo)) {
      return roundTo * Math.round(weight / roundTo);
    },

    checkAndSetLocalStorageTM() {
      if (localStorage.getItem("tm") !== this.tm) {
        localStorage.setItem("tm", this.tm);
      }
      if (localStorage.getItem("roundTo") !== this.roundTo) {
        localStorage.setItem("roundTo", this.roundTo);
      }
      if (localStorage.getItem("jokers") !== this.jokers) {
        localStorage.setItem("jokers", this.jokers);
      }
      if (localStorage.getItem("threeFiveOne") !== this.threeFiveOne) {
        localStorage.setItem("threeFiveOne", this.threeFiveOne);
      }
      if (localStorage.getItem("fivePros") !== this.fivePros) {
        localStorage.setItem("fivePros", this.fivePros);
      }
    },

    getLocalStorageFields() {
      console.log(localStorage);
      if (localStorage.getItem("tm")) {
        this.tm = localStorage.getItem("tm");
      }
      if (localStorage.getItem("roundTo")) {
        this.roundTo = localStorage.getItem("roundTo");
      }
      if (localStorage.getItem("jokers")) {
        this.jokers = localStorage.getItem("jokers") === "true" ? true : false;
      }
      if (localStorage.getItem("threeFiveOne")) {
        this.threeFiveOne = localStorage.getItem("threeFiveOne") === "true"
          ? true
          : false;
      }
      if (localStorage.getItem("fivePros")) {
        this.fivePros = localStorage.getItem("fivePros") === "true"
          ? true
          : false;
      }
    },
  }));

  Alpine.data("workoutRow", (percentage) => ({
    showPlates: false,

    percentageCalc() {
      return Math.round(percentage * 100);
    },

    percentageAndWeight() {
      return `${this.percentageCalc(percentage)}% - ${
        this.roundToWeight(this.tm * percentage)
      }lbs`;
    },

    calculatePlates(total, barWeight = 45) {
      let plate_values = [
        45,
        25,
        10,
        5,
        2.5,
        1.25,
      ];
      let plates = {};
      const total_minus_bar = total - barWeight;
      let half_total = total_minus_bar / 2;
      for (const w of plate_values) {
        while (half_total >= w) {
          if (plates[w] === undefined) {
            plates[w] = 1;
          } else {
            plates[w] += 1;
          }
          half_total -= w;
        }
      }
      let formatted_plates = [];
      for (
        const [key, value] of Object
          .entries(plates)
          .sort(
            (a, b) => b[0] - a[0],
          )
      ) {
        formatted_plates.push(`<b>${key}</b>: ${value}`);
      }
      return formatted_plates.join(" | ");
    },
  }));
});
