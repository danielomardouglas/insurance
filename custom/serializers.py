from rest_framework import serializers

from . import models


class RiskFieldSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.RiskField
        fields = ('id', 'name', 'type', 'options')
        extra_kwargs = {
            'options': {'required': False},
            'id': {
                'read_only': False,
                'required': False
            },
        }


class RiskTypeListSerializer(serializers.ModelSerializer):
    risk_fields = RiskFieldSerializer(many=True, required=False)

    class Meta:
        model = models.RiskType
        fields = ('id', 'name', 'risk_fields')
        read_only_fields = ('id', )

    def create(self, validated_data):
        risk_fields = validated_data.pop('risk_fields', [])
        risk_type = super(RiskTypeListSerializer, self).create(validated_data)
        for field in risk_fields:
            risk_type.risk_fields.create(**field)
        return risk_type

    def update(self, instance, validated_data):
        risk_fields = validated_data.pop('risk_fields', [])
        instance = super(RiskTypeListSerializer, self).update(
            instance, validated_data)
        for field_data in risk_fields:
            field_id = field_data.pop('id', None)
            if field_id:
                field = instance.risk_fields.get(id=field_id)
                for field_key, field_value in field_data.items():
                    setattr(field, field_key, field_value)
                field.save()
            else:
                instance.risk_fields.create(**field_data)
        return instance
