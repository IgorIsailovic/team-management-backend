package com.igor.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

public class JsonUtility {
	private static ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
	public static String print(Object o){
		String json;
		try {
			json = ow.writeValueAsString(o);
			return json;
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		}
		return null;
	}
}