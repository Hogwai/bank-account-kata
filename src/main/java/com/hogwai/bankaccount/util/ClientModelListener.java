package com.hogwai.bankaccount.util;

import com.hogwai.bankaccount.model.Client;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;


@Component
public class ClientModelListener extends AbstractMongoEventListener<Client> {

    private SequenceGenerator sequenceGenerator;

    @Autowired
    public ClientModelListener(SequenceGenerator sequenceGenerator) {
        this.sequenceGenerator = sequenceGenerator;
    }

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Client> event) {
        if (event.getSource().getId() == null || event.getSource().getId() < 1) {
            event.getSource().setId(sequenceGenerator.generateSequence(Client.SEQUENCE_NAME));
        }
    }
}