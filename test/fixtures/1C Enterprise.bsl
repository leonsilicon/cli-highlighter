#ЗагрузитьИзФайла ext_module.txt // директива 7.7
#Если Клиент ИЛИ НаКлиенте Тогда // инструкции препроцессора
	&НаКлиентеНаСервереБезКонтекста // директивы компиляции
	Функция ТолстыйКлиентОбычноеПриложение(Знач Параметр1 = Неопределено, // комментарий
		Параметр2 = "", ПараметрN = 123.45, ПарамNN) Экспорт // еще комментарий
		Попытка
			Результат_Булевы_Значения = Новый Структура("П1, П2", Истина, Ложь, NULL, Неопределено);
			Перейти ~МеткаGOTO; // комментарий
			РезультатТаблицаДат = Новый ТаблицаЗначений;
			РезультатТаблицаДат.Колонки.Добавить("Колонка1", 
			Новый ОписаниеТипов("Дата", , ,
			Новый КвалификаторыДаты(ЧастиДаты.ДатаВремя));
			НС = РезультатТаблицаДат.Добавить(); НС["Колонка1"] = '20170101120000');
		Исключение
			ОписаниеОшибки = ОписаниеОшибки(); // встроенная функция
			Масс = Новый Массив; // встроенный тип
			Для Каждого Значение Из Масс Цикл
				Сообщить(Значение + Символы.ПС + "
				|продолжение строки"); // продолжение многострочной строки
				Продолжить; Прервать;
			КонецЦикла;
			СправочникСсылка   = Справочники.Языки.НайтиПоНаименованию("ru"); // встроенные типы
			СправочникОбъект   = СправочникСсылка.ПолучитьОбъект();
			ПеречислениеСсылка = Перечисления.ВидыМодификацииДанных.Изменен;
			ВызватьИсключение ОписаниеОшибки;
		КонецПопытки;
		~МеткаGOTO: // еще комментарий
		ВД = ВидДвиженияБухгалтерии.Дебет;
	КонецФункции // ТолстыйКлиентОбычноеПриложение()
#КонецЕсли