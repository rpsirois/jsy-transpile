
import { genMochaSyntaxTestCases, standardTransforms } from './_xform_syntax_variations'
describe @ 'Switch Statements',
  genMochaSyntaxTestCases @ iterSyntaxVariations, standardTransforms




function * iterSyntaxVariations() ::
  // switch (expr) :: cases variations
  yield @{} expectValid: true
      title: 'vanilla switch statement'
      source: @[] 'switch (expr) { case a: default: break }'
      tokens: @[] 'switch', '(', 'name', ')', '{', 'case', 'name', ':', 'default', ':', 'break', '}'

  yield @{} expectValid: true
      title: 'offside switch statement'
      source: @[] 'switch (expr) :: case a: default: break'
      tokens: @[] 'switch', '(', 'name', ')', '{', 'case', 'name', ':', 'default', ':', 'break', '}'

  yield @{} expectValid: true
      title: 'keyword offside switch statement'
      source: @[] 'switch expr :: case a: default: break'
      tokens: @[] 'switch', '(', 'name', ')', '{', 'case', 'name', ':', 'default', ':', 'break', '}'

  yield @{} expectValid: true
      title: 'keyword @ offside switch statement'
      source: @[] 'switch @ expr :: case a: default: break'
      tokens: @[] 'switch', '(', 'name', ')', '{', 'case', 'name', ':', 'default', ':', 'break', '}'

  yield @{} expectValid: true
      title: 'keyword offside switch statement with call'
      source: @[] 'switch fn_call @ x, y :: case a: default: break'
      tokens: @[] 'switch', '(', 'name', '(', 'name', ',', 'name', ')', ')', '{', 'case', 'name', ':', 'default', ':', 'break', '}'

   

