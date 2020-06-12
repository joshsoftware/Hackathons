package com.example.shoptokapplication.network;

/**
 * Created by shekhar on 13/06/16.
 */
public enum Environment {

    LOCAL {
        @Override
        public String getBaseUrl() {
            return "";
        }

        @Override
        public String getAwsBucketName() {
            return "";
        }

    }, STAGING {
        @Override
        public String getBaseUrl() {
            return "https://38f0b7830488.ngrok.io";
        }


        @Override
        public String getAwsBucketName() {
            return "";
        }

    }, PRODUCTION {
        @Override
        public String getBaseUrl() {
            return "https://reqres.in/";
        }

        @Override
        public String getAwsBucketName() {
            return "";
        }

    };

    public abstract String getBaseUrl();

    public abstract String getAwsBucketName();

}
