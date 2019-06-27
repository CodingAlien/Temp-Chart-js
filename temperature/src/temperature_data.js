function temperatureData(temp_Data, timestamp_array) {
    return {
        type: 'line',
        //theme : "light2",
        
        data: {    
            labels: timestamp_array,
            datasets: [
                {
                    label:  'Temp',
                    data:  temp_Data,
                    borderWidth: 3,
                    pointBorderColor: 'blue',
                    pointBackgroundColor: 'blue',
                    borderColor: '#05CBE1'
                    },    
            ]
        },
    options: {
        legend: {
            onHover: function(e) {
               e.target.style.cursor = 'pointer';
            }
         },
         hover: {
            onHover: function(e) {
               var point = this.getElementAtEvent(e);
               if (point.length) e.target.style.cursor = 'pointer';
               else e.target.style.cursor = 'default';
            }
         },

    }
    }
}
export default temperatureData;

