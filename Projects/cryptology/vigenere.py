#!/usr/bin/env python
 # -*- coding: utf-8 -*-
import os, sys
'''
uso: python3 vigenere.py

You will cipher/decipher the given text with the given key
'''

def ask_inputs():
    """
    function that asks the user for the inputs for the algorithm
    """

    alph = ""
    input_string = ""
    key = ""

    alph = input("Write S for swedish alphabet, else for english : ")
    alph = alph.lower()
    alphabet = "abcdefghijklmnopqrstuvwxyz"
    if alph == "s":
        alphabet+="åäö"

    # Takes key from user
    key = input("Please enter encryption key: ")
    key = key.lower()

    # Takes string from user
    input_string = input("Please enter a string of text: ")
    input_string = input_string.lower()

    return alphabet,key,input_string

def expand_key(key,input_string):
    """
    Expands the encryption key to make it the same size as the inputted string
    """
    # Lengths of input_string
    string_length = len(input_string)

    expanded_key = key
    expanded_key_length = len(expanded_key)

    while expanded_key_length < string_length:
        # Adds another repetition of the encryption key
        expanded_key += key
        expanded_key_length = len(expanded_key)

    return expanded_key,expanded_key_length

def vigenere_enc(alphabet,enc_key,input_string):
    """
    perfoms the encode operation of the vigenere algorithm
    """

    enc_string = ""

    expanded_key,expanded_key_length = expand_key(enc_key,input_string)

    key_position = 0
    alph_len = len(alphabet)

    for letter in input_string:
        if letter in alphabet:
            # cycles through each letter to find it's numeric position in the alphabet
            position = alphabet.find(letter)
            # moves along key and finds the characters value
            key_character = expanded_key[key_position]
            key_character_position = alphabet.find(key_character)
            key_position += 1
            # changes the original of the input string character
            new_position = position + key_character_position
            if new_position >= alph_len:
                new_position = new_position - alph_len
            new_character = alphabet[new_position]
            enc_string += new_character

    return enc_string


def vigenere_dec(alphabet,dec_key,input_string):
    dec_string = ""

    expanded_key,expanded_key_length = expand_key(dec_key,input_string)

    key_position = 0
    alph_len = len(alphabet)

    for letter in input_string:
        if letter in alphabet:
            # cycles through each letter to find it's numeric position in the alphabet
            position = alphabet.find(letter)
            # moves along key and finds the characters value
            key_character = expanded_key[key_position]
            key_character_position = alphabet.find(key_character)
            key_position += 1
            # changes the original of the input string character
            new_position = position - key_character_position
            if new_position >= alph_len:
                new_position = new_position + alph_len
            new_character = alphabet[new_position]
            dec_string += new_character

    return dec_string
