const numbers = {

  round_weight(weight) {
    return 2.5 * Math.ceil(weight/2.5)
  },

  calculate_plates(total) {
    let plate_values = [
      45,
      25,
      10,
      5,
      2.5,
      1.25,
    ]
    let plates = {}
    const total_minus_bar = total - 45
    let half_total = total_minus_bar / 2
    for (const w of plate_values) {
      while (half_total >= w) {
        if (plates[w] === undefined) {
          plates[w] = 1
        } else {
          plates[w] += 1
        }
        half_total -= w
      }
    }
    let formatted_plates = []
    for (
        const [key, value] of
        Object
        .entries(plates)
        .sort(
            (a, b) => b[0]-a[0]
        )
    ) {
      console.log(key)
      formatted_plates.push(`${key}: ${value}`)
    }
    return formatted_plates.join(" | ")
  },

  tm: 0,
  wu_percentages: [.4, .5, .6],
  w1_percentages: [.65, .75, .85],
  w2_percentages: [.7, .8, .9],
  w3_percentages: [.75, .85, .95],

};

window.numbers = numbers;
