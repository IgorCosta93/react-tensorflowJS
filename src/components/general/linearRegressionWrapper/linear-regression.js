import * as tf from '@tensorflow/tfjs';
import _ from 'lodash';

class LinearRegression{
    constructor(features, labels, options){
        this.features = this.processFeatures(features);
        this.labels = tf.tensor(labels);
        this.mseHistory = [];

        this.options = Object.assign({ learningRate: 0.1, iterations: 1000 }, options);

        this.weights = tf.zeros([this.features.shape[1],1]);
    }

    gradientDescent(features, labels){
        // matMul() stands for Matriz Multiplication
        const currentGuesses = features.matMul(this.weights);
        const differences = currentGuesses.sub(labels);

        const slopes = features
            .transpose()
            .matMul(differences)
            .div(features.shape[0]);

        this.weights = this.weights.sub(slopes.mul(this.options.learningRate));
    }

    train(){
        const batchQuantity = Math.floor(this.features.shape[0] / this.options.batchSize);

        for(let i = 0; i < this.options.iterations; i++){
            for(let j = 0; j < batchQuantity; j++){
                const startIndex = j * this.options.batchSize;
                const { batchSize } = this.options;
                const featureSlice = this.features.slice([startIndex, 0], [batchSize, -1]);
                const labelSize = this.labels.slice([startIndex, 0], [batchSize, -1]);

                this.gradientDescent(featureSlice, labelSize);
            }
            //this.recordMSE();
            this.updateLearningRate();
        }
    }

    predict(observations){
        return this.processFeatures(observations).matMul(this.weights);
    }

    test(testFeatures, testLabels, r2, setR2){
        testFeatures = this.processFeatures(testFeatures);
        testLabels = tf.tensor(testLabels);

        const predictions = testFeatures.matMul(this.weights);

        const res = testLabels.sub(predictions)
            .pow(2)
            .sum();
        
        //mean is the average value
        const tot = testLabels.sub(testLabels.mean())
            .pow(2)
            .sum();

        res.data().then((r)=>{
            tot.data().then((d)=>{
                setR2(r2 = (1 - r[0] / d[0]))
            })
        })

        //return 1 - res / tot;
    }

    processFeatures(features){
        features = tf.tensor(features);

        if(this.mean && this.variance){
            features = features.sub(this.mean).div(this.variance.pow(0.5));
        }else{
            features = this.standardize(features)
        }

        // shape on position 0 return the Nº of rows
        features = tf.ones([features.shape[0], 1]).concat(features, 1);

        return features;
    }

    standardize(features){
        const { mean, variance } = tf.moments(features, 0);

        this.mean = mean;
        this.variance = variance;

        return features.sub(mean).div(variance.pow(0.5));
    }

    recordMSE(){
        const mse = this.features
            .matMul(this.weights)
            .sub(this.labels)
            .pow(2)
            .sum()
            .div(this.features.shape[0])
            .get();

        this.mseHistory.unshift(mse);
    }

    updateLearningRate(){
        if(this.mseHistory.length < 2) return 

        if(this.mseHistory[0] > this.mseHistory[1]){
            this.options.learningRate /= 2
        }else{
            this.options.learningRate *= 1.05; //increase by 5%
        }
    }
}

export default LinearRegression;