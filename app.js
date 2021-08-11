document.addEventListener("alpine:init", () => {
  Alpine.data("workoutBuilder", () => ({
    roundTo: 2.5,
    tm: 245,
    jokers: false,
    threeFiveOne: false,
    fivePros: false,

    workouts: [
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
    ],

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
    },

    roundToWeight(weight, roundTo = parseFloat(this.roundTo)) {
      return roundTo * Math.round(weight / roundTo);
    },
  }));

  Alpine.data("plateCalc", () => ({
    plateCalc: false,

    calculatePlates(total) {
      let plate_values = [
        45,
        25,
        10,
        5,
        2.5,
        1.25,
      ];
      let plates = {};
      const total_minus_bar = total - 45;
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
